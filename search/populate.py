import chromadb
import cohere
import os
from dotenv import load_dotenv
import hashlib
from search import SearchEngineService

load_dotenv()

chroma_client = chromadb.PersistentClient(path="./chromadb")

# self.collection = self.chroma_client.create_collection(name="journal_entries")
collection = chroma_client.get_collection(name="journal_entries")
cohere_client = cohere.Client(os.environ["COHERE_API_KEY"])

search_engine_service = SearchEngineService()

# Generate embeddings for journal entries
journal_entries = ["""I need to get this off my chest. It's 9 p.m., and I'm just now sitting down to unwind, but I feel like I need to scream into this recorder first. Today was... well, let's just say it was one of those days where you question all your life choices.
I spent the entire day in meetings. Literally, the entire day. Back-to-back meetings where everyone had an opinion on the project, and no one agreed on anything. It's like, I get it, the design process is collaborative, but do we need ten people giving their two cents on the color of a button? I wanted to yell, "It's a button! The user isn't going to care if it's navy blue or slate gray!" But no, we had to debate it for half an hour like it was the most critical decision of the year.
And don't even get me started on the feedback loop. God, the feedback loop. I can't believe how many times we go around in circles. I sent out the mockups last week, and now, after they've been sitting in everyone's inbox, suddenly it's "urgent" that we discuss them today. And of course, the higher-ups have all these "thoughts." They want it to be more "modern" but also "classic," and "minimalist" but also "feature-rich." What does that even mean? I can't design a product that’s both a Tesla and a Swiss Army knife. Can someone just make a decision, please?
Oh, and the cherry on top was the client meeting this afternoon. You'd think by now they'd know what they want, right? Nope. They come in with this vague idea of a "refresh," and when I try to nail down specifics, it's like trying to catch smoke with my hands. "We want it to feel more intuitive," they say. What does that even mean? Intuitive to whom? A toddler? A rocket scientist? Honestly, I think they just throw around buzzwords to sound like they know what they're talking about. "Intuitive," "user-friendly," "cutting-edge"—it's like they have a checklist of clichés they need to hit before they feel like they've contributed.
I'm so tired of this endless push and pull. Everyone wants the perfect product, but they don't want to make any hard choices to get there. They want me to do it all, to magically make everything align, and then they swoop in with last-minute changes that contradict the entire design philosophy we've been working on for months. It's maddening.
I just... I don't know. Some days, I love what I do. When I'm actually designing, when I'm in that flow state where it's just me and the ideas, it's amazing. But days like today make me wonder if it's worth it. Is it always going to be like this? A constant battle of egos, conflicting opinions, and indecision?
I need a drink. Or a vacation. Or both. Tomorrow will be better. It has to be, right?
Okay, rant over. I feel slightly better now that it's out of my system. I'm going to go take a hot shower and try to forget this day ever happened.
"""]

search_engine_service.insert_entry(journal_entries[0])

# embeddings = cohere_client.embed(texts=journal_entries).embeddings

# # Add embeddings to ChromaDB
# ids = [hashlib.sha256(entry.encode('utf-8')).hexdigest() for entry in journal_entries]

# collection.add(
#     documents=journal_entries,
#     embeddings=embeddings,
#     ids=ids
# )