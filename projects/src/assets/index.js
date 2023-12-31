export const globalTasks = [
  {
    id: 1,
    title: "Complete",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    status: "ready",
    members: ["John Doe", "Jane Doe"],
    date: "2020-15-01",
    projectName: "Project1",
  },
  {
    id: 2,
    title: "Complete projects ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    status: "done",
    members: ["John Doe", "Jane Doe"],
    date: "2021-01-01",
    projectName: "Project2",
  },
  {
    id: 3,
    title: "Complete projects FUCK",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    status: "in-progress",
    members: ["John Doe", "Jane Doe"],
    date: "2023-20-05",
    projectName: "Project3",
  },
  {
    id: 4,
    title: "Complete projects YOU",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    status: "needs-review",
    members: ["John Doe", "Jane Doe"],
    date: "2022-10-01",
    projectName: "Project4",
  },
  {
    id: 5,
    title: "Complete projects WUOULD",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    status: "ready",
    members: ["John Doe", "Jane Doe", "Steve Doe"],
    date: "2020-15-01",
    projectName: "Project5",
  },
];

export const globalComments = [
  {
    id: 1,
    username: "Floyd Miles",
    text: "Actually, now that I try out the links on my message, above, none of them take me to the secure site. Only my shortcut on my desktop, which I created years ago.",
    time: "6 hours",
    replyId: 0,
  },
  {
    id: 2,
    username: "Albert Flores",
    text: "Hi, lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
    time: "18 sec",
    replyId: 1,
  },
  {
    id: 3,
    username: "Abay Aliyev",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, alias?",
    time: "1 min",
    replyId: 1,
  },
  {
    id: 4,
    username: "Charlie Brown",
    text: "This is a top-level comment without any replies.",
    time: "2 hours",
    replyId: 0,
  },
  {
    id: 5,
    username: "Eva Green",
    text: "Another top-level comment.",
    time: "3 hours",
    replyId: 0,
  },
  {
    id: 6,
    username: "David Smith",
    text: "Replying to comment #2 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    time: "30 min",
    replyId: 2,
  },
  {
    id: 7,
    username: "Grace Johnson",
    text: "Replying to comment #3 Saepe, alias? Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    time: "45 min",
    replyId: 3,
  },
  {
    id: 8,
    username: "John Doe",
    text: "Nested reply to comment #6.",
    time: "20 min",
    replyId: 6,
  },
  {
    id: 9,
    username: "Alice Wonderland",
    text: "Nested reply to comment #7.",
    time: "1 hour",
    replyId: 7,
  },
  {
    id: 10,
    username: "Bob Marley",
    text: "Another top-level comment with no replies.",
    time: "4 hours",
    replyId: 0,
  },
];

export const messages = [
  {
    id: 1,
    sender: "John Doe",
    receiver: "Jane Doe",
    date: "2022-11-27T10:30:00",
    text: "Hey, how are you?",
  },
  {
    id: 2,
    sender: "Jane Doe",
    receiver: "John Doe",
    date: "2022-11-27T10:35:00",
    text: "I'm doing well, thanks! How about you?",
  },
  {
    id: 3,
    sender: "John Doe",
    receiver: "Jane Doe",
    date: "2022-11-27T10:40:00",
    text: "I'm good too. Any plans for the weekend?",
  },
  {
    id: 4,
    sender: "Jane Doe",
    receiver: "John Doe",
    date: "2022-11-27T11:00:00",
    text: "Not yet, maybe just relaxing at home. You?",
  },
  {
    id: 5,
    sender: "John Doe",
    receiver: "Jane Doe",
    date: "2022-11-27T11:15:00",
    text: "Sounds nice. I might catch up on some reading.",
  },
  {
    id: 6,
    sender: "Jane Doe",
    receiver: "John Doe",
    date: "2022-11-27T12:00:00",
    text: "That's a good plan. What book are you reading?",
  },
  {
    id: 7,
    sender: "John Doe",
    receiver: "Jane Doe",
    date: "2022-11-27T12:30:00",
    text: "I'm reading 'The Great Gatsby' at the moment.",
  },
  {
    id: 8,
    sender: "Jane Doe",
    receiver: "John Doe",
    date: "2022-11-27T13:00:00",
    text: "Nice choice! It's a classic. Enjoy your reading.",
  },
  {
    id: 9,
    sender: "John Doe",
    receiver: "Jane Doe",
    date: "2022-11-27T14:00:00",
    text: "Thanks! Anything interesting on your agenda?",
  },
  {
    id: 10,
    sender: "Jane Doe",
    receiver: "John Doe",
    date: "2022-11-27T14:30:00",
    text: "I'm going to the gym in the afternoon and then I'm meeting a friend for dinner.",
  },
];
