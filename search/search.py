import chromadb
import cohere
import os
from dotenv import load_dotenv
import hashlib

load_dotenv()

class SearchEngineService:
    def __init__(self):
        # ChromaDB & Cohere initialization
        self.chroma_client = chromadb.PersistentClient(path="./chromadb")

        # self.collection = self.chroma_client.create_collection(name="journal_entries")
        self.collection = self.chroma_client.get_collection(name="journal_entries")
        self.cohere_client = cohere.Client(os.environ["COHERE_API_KEY"])

        # # Generate embeddings for journal entries
        # journal_entries = [
        #     "I went for a walk today and saw many dogs",
        #     "I am at Hack the North and it took 3 hours to think of an idea after we spent two weeks deciding what we would do.",
        #     "Today I fell and scratched my knee.",
        #     "I was feeling very anxious today.",
        #     "I was able to solve a bug with an LLM today, it was an issue with responses from the LLM. It was returning a Cohere object rather than a normal Python datatype."
        # ]
        # embeddings = self.cohere_client.embed(texts=journal_entries).embeddings

        # # Add embeddings to ChromaDB
        # ids = [f"doc_{i}" for i in range(len(journal_entries))]
        # self.collection.add(
        #     documents=journal_entries,
        #     embeddings=embeddings,
        #     ids=ids
        # )

    # API Functions
    def retrieve_entries(self, query, top_k=5):
        query_embedding = self.cohere_client.embed(texts=[query]).embeddings[0]
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        return results['documents'][0]

    def insert_entry(self, content):
        try:
            embeddings = self.cohere_client.embed(texts=[content]).embeddings
            hash_id = hashlib.sha256(content.encode('utf-8')).hexdigest()
            self.collection.add(
                documents=[content],
                embeddings=embeddings,
                ids=[hash_id]
            )
        except Exception as err:
            return err

        return True

    def generate_response(self, query, retrieved_texts):
        prompt = (
            f"Based on the following journal entries:\n\n"
            f"{retrieved_texts}\n\n"
            f"Answer the following question:\n{query}"
            f"Make the answer concise but make it feel genuine and human-like."
        )
        response = self.cohere_client.generate(
            model='command',
            prompt=prompt,
            max_tokens=350,
            temperature=0.7
        )
        return response.generations[0].text.strip()

    def rag_search(self, query):
        print("Starting Rag Search")
        retrieved_entries = self.retrieve_entries(query)
        print("Retrieved journal entries")
        retrieved_texts = "\n\n".join(retrieved_entries)
        print("Concatenating entries")
        response = self.generate_response(query, retrieved_texts)
        print("Generated response")
        return response
