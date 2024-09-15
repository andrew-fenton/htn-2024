import axios from "axios";

const journal_entry = {
    "title": "Making a big leap",
    "text":
    `So, I took a bigger risk today. After reflecting on how I haven’t been pushing myself out of my comfort zone, I realized that it was time to shake things up a bit. I’ve been mulling over this idea for a while, but kept putting it off because it seemed too daunting. Today, though, I decided to go for it.
I reached out to a startup that’s been on my radar for a while. I’ve been thinking about joining them on a freelance basis, but it felt like a big leap—leaving the stability of my current job for something that’s less predictable. It’s a risk because it means stepping away from the familiar and diving into the unknown. But I realized that if I’m truly committed to growth, I need to embrace these kinds of opportunities.
I crafted a pitch, showcasing my design portfolio and explaining how my skills could contribute to their projects. It was nerve-wracking, but I sent it off this afternoon. And now, well, now I’m in that anxious but excited state of waiting for a response. I know it’s just one step, and I might not hear back, but it feels incredibly liberating to have taken that leap.
It’s strange how a small decision like this can make such a big difference in how I feel. I’m already thinking about what other risks I might want to take, what other comfort zones I might need to push. Today was a good reminder that sometimes the biggest risks lead to the most rewarding experiences. I’m proud of myself for going for it. Let’s see where this path leads.
`
}

const run = async () => {
    const res = await axios.post("http://127.0.0.1:8000/create_note", journal_entry);
    console.log(res.data);
};

run();