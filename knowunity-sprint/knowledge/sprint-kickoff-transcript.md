# KnowUnity Sprint Kickoff — Summary + Full Transcript

> Source: recorded kickoff call between Harry (Lead Designer, KnowUnity) and the
> sprint host. First touchpoint for the design sprint.
> This file contains a structured **summary** first, then the **full transcript**.

> **Trimmed to the recording.** The source auto-transcript captured audio before
> and after the recording itself. Everything outside the recorded window has been
> removed, so this file now matches exactly what designers hear in the video.

---

# PART 1 — SUMMARY

## About KnowUnity

- A study app for high school and middle school students.
- Origins: founded by students (~17–18 at the time), "by students, for students." Originally a notes-sharing app — strong students uploaded notes (e.g. biology), other kids used them to prep for exams.
- Layered on over the years: quizzes, flashcards, and increasingly AI — positioned as a "ChatGPT for school" companion.
- Scale: active in ~28 countries, 30M+ downloads, 1–2M daily active users. In core markets (Germany, France, Italy, Spain), roughly one in two kids uses it to study.
- Used for homework, exam prep, and general questions/tips about school life.

## Design & Brand State

- Honest self-assessment: feels like "20 different engineers went off into different rooms, built different features, and glued them back together." A bit "AI sloppy," no overarching design system.
- Competitive pressure: students used to Instagram/WhatsApp; expectations (especially US) are higher than they were for German kids years ago. Driving heavy brand investment.
- Working with agency **Wreck-It-Edge** on a new mascot and brand direction.

### New brand elements
- New mascot (**Noe**) with core poses.
- New color scheme: **five accent colors** in the Figma variables panel.
- Custom font (not shareable) — **use Inter Variable for prototypes**.
- More "delightful" buttons with physical feedback + audio.
- Animator sketches frame-by-frame by hand, then turns sketches into polished live files.
- **Dark mode only** currently. Accent colors usable as a "takeover color" to shift mood / add delight.

### Reskin in progress
- Whole app being reskinned over the summer, squad by squad.
- **Guidance:** work from the *target state* (new brand direction), **not** the current live app — especially for delightful UX/UI.

### Figma file Harry is providing
- Mascot + core poses.
- Bare-bones components: bottom sheets, buttons, chat, chips, etc.
- Example screens with the brand applied, as a possible starting point.
- ARRIVE files in Discord for more polished prototype outputs.

## The Sprint Brief: Voice Recall (Active Recall Self-Check)

### Squad context: Practice Squad
Focused on best preparing a student for an exam/homework. Existing formats:
- Core quizzes (MCQ + other formats)
- Flashcards
- **Exam plans / learning plans** (new): give the app your exam date + syllabus, it builds a custom learning path. Currently includes MCQs, flashcards, AI chat summaries.

### The new idea: Voice Recall
A **new practice format** built on **active recall**. After a quiz or exam plan, the app asks the student to explain a concept **in their own words**, out loud.

- Student talks to **Noe** — meant to feel like chatting with a friend/tutor.
- Tutor-style prompting + nudges/context when stuck.
- **Voice mode** like chat voice: prompts to talk, detects when you stop, transcribes in real time.
- Flow: talk → short response → nudge further → continue through all learning-plan topics.
- **Summary screen** at the end, e.g. "Nice work, you recalled 80% — you're ready."

### Rough prototype exists
Built by an engineer (possibly in Claude design). Very rough. Engineers are strong on edge cases but weak on **UX subtleties** — exactly where designers add value.

### Two core design questions
1. **Entry point:** how do we enter this mode (from learning plan, or after a quiz)? Where and how?
2. **The experience:** once inside, how should it look and feel — especially the **voice interaction / voice UX**.

## Key UX Considerations
- **System status is critical** — idle, listening, recording, processing must all be legible. Student must always know: Should I talk now? Can I still talk? Do I need to pause?
- **Keeping the student in control** — pause, start over. Being put on the spot makes students stumble or want to restart; design for that anxiety.
- **An "I can't talk right now" escape** — Duolingo does this well.
- **Tutor behavior when a student doesn't know** — push? hint? mini-summary then re-ask? move on? How strict? Open question.
- **Loading / latency states** — AI responses lag; both sides need loading states.
- **Existing voice usage** — many students already use voice in core AI chat, but it's basic (records a voice note and sends). Nothing sophisticated yet.

## Scope Guidance
- **~2.5 weeks.** Pick your battles.
- **Focus on the happy path** — student knows the material and nails it. Engineers handle edge cases.
- This is a **V1 / first step**, not a final product. Goal: learn how students use it, gather input.
- Note (don't fully design) what can go wrong — valuable for voice-AI case studies.
- Some ideas may ship to millions.
- First sprint ever to tackle **voice AI UX** — novel, timely, strong case study. AI UX is **nonlinear**.

> ⚠️ Name spellings ("Noe", "Wreck-It-Edge") are phonetic guesses from the
> auto-transcript. Verify against the Figma file.

---

# PART 2 — FULL TRANSCRIPT

> Verbatim, from "we are recording now" to "I'm going to stop the recording now."
> Speakers are not labeled in the source; the conversation is between **Harry**
> (KnowUnity) and the **sprint host**.

Okay, perfect. We are recording now. Hey, Harry. Cool.

Yeah, sounds...

So, yeah, this is the first touch point for our designers in the sprint. So, Harry, you know, our designers already know that they're going to be partnering with your company, KnowUnity, and that you are the lead designer. But just to get them started from, you know, sort of initial context, let's talk a little bit about KnowUnity, you know, who it's for, what you guys are trying to do here, and then we can go into the sprint.

Into the sprint brief, sorry. Perfect.

Sounds good, sounds good. If you want, I can real quick like share my screen so you have some visuals to look at.

But long story short, what do we do? We basically...

an app for high school kids and for middle school kids. And when I joined, I joined for the first time like five years ago. I joined as a PM initially, so I have economics, Search consulting background actually initially. And I went into product and at the very beginning, we were an app that was made by students. Our founders were 17, 18 at the time. Made by students, like for students. And so like if you were really good in biology, you would take a picture of your biology notes, upload it to the app, and then like other kids would like use those notes to prep for exams. And now we build, over the years, we've built like a lot of things on top, like quizzes and flashcards that I'll show you like later.

And also obviously like with AI, we increasingly have become a sort of chat GPT for school. companion and these days we're active I think in 28 different countries I think we have like 30 million plus downloads by now, one to two million daily active users. So like, especially in the core countries in Germany and France and Italy and Spain, like one out of two kids basically uses our app to study and prep for school and just not only like prep for homework, but also like prep for exams.

And oftentimes also like ask us like questions and for tips on how to handle like different things in their school life. But that's a bit about the app. And if you want, stop me if you have any questions, but I can quickly run you through where we stand at the moment on a design front before giving the So as I mentioned, like we, we, Feels like we told 20 different engineers to go off in different rooms, build different features, and then I glued them back together.

oh Thank you.

Yeah, go for it. Good.

-No.

And I think because we're competing and because students are used to Insta and WhatsApp and their expectations, especially in the US, are much higher than they used to be for German kids a couple years back, we now need to invest in brand. And at the moment, this is a bit what the brand looks like. And that's obviously also my fault as a head of design, that falls on me. But if you look at the the slides, the website, the web app, the actual app, different parts of the app itself.

It just feels, A, a bit AI sloppy at times, and B, it just also feels like there's no overarching design system. And so that's what we're working on more and more. We worked with an agency that's called Wreck-It-Edge on this cute mascot that you see here on the left because we want to now invest much more in brand, I can provide more like in Discord, like arrive files if you want to make your prototypes even like more polished and more exciting for X or wherever you want to share those. But that's a bit like what we worked on.

We worked on a new color scheme, quite a few other elements of the brand. And this is a bit like what the new brand looks like. We have the font. The font is a custom font that you likely won't have. You can use inter-variable for your prototypes. Otherwise, you can have it chat in Discord. We have some more delightful buttons that, especially if you prototype things, I think add quite a bit of physical delight, coupled with feedback and stuff. And audio, I think this is quite neat.

We thought a lot about the color system. So we now have five different accent colors. in this file that I'll provide you that you'll have access to. You'll have those basic in the variables panel. So you can use those in your designs and you can point at those in using your figment and stuff. But that's basically it.

So cute.

Here you can see some of our straight versions.

We have We have a really great animator that we work with who starts out by sketching things by hand, frame by frame, and then turns them into very cool live files. But indeed, yep, so this is a bit like what the new screens will look like. If you look at the app, we're in the midst of our resketting process, so over summer, we'll basically tackle the entire app. And if you want to have a quick look behind the scenes, we're mapping out for all the different squads, and how do you want to approach all these things and reskin them.

Wow.

Okay.

So if you look at the app, this is not exactly how we'll look there at the moment, but it's the target picture.

That's actually really good to know then.

And Yes.

So then designers should rely a little bit more on what you guys are currently working on versus what is in the app to guide, I mean, especially sort of their delightful UX interactions and UI.

Okay. Yeah. Okay. Nice.

Yeah, exactly.

Yeah, I would work with the target state instead of the status quo.

Yeah, I think that would be most, that's it here.

Yeah, this is for some special occasions, just some additional thought around that. We currently only have dark mode and finally, I have different accent colors and I have thought is like in certain places where you want to add some extra delight or like just like change the mood a bit, like change the scene a bit.

Yeah.

We can like use those as a sort of takeover color to, you know, just inject the look and feel and that's an additional delight to that. But what you have before I jump into the brief, what you have in there, you have, The mascot and some core poses, so to speak, that you can use. You have some bare bones components, so like the bottom sheets, the buttons, the chat if you need it too, some chips, et cetera. I'll tweak it a tiny bit and add some additional things in there.

Added some example screens in case you wanted to use that as a starting point where those are applied, so to speak.

Perfect.

Love that.

And That is basically it.

Okay.

I'll add in the next step, I will probably get to it later today, but I'll add a brief over here based on what our colleagues are currently actually working on. So this is actually going to be something that some of our designers are looking into at the moment, are thinking about at the moment.

And so I think more additional takes and ideas, inspirations can come in quite handy.

No, I think I'll have more questions in the brief.

and handy and I think probably some of the ideas that you will be working on will actually probably make it to the app and ship to millions, which I think is also quite neat. So that's on that front. Any questions before I go over to Linear and share the prototype and give some context on that? No.

I think this is a really good setup. Thank you, Harry. I think there's really good context for designers, for Claude to be working on, like you said, to be able to create prototypes that feel a little bit more in line to what you guys are looking for now. And yeah, I think we can just jump into the brief.

Cool, sounds good.

So if you want, a good place to start is I think I can show you like the status quo because like this is basically going to be a lot about practice squad.

And the practice squad, what does it care about? It basically, it thinks a lot about if you have an exam, if you have like a homework, How do we actually best prepare you for that?

And.

There's a couple of different things. We have obviously the core quizzes where you just have multiple choice, or you have also different question formers and the likes. You have that, you have flashcards, but also since a couple of weeks ago, we have something that we call exam plans/learning plans, which is basically if you tell us, "Hey, this is for our upcoming math exam "in a week time from today." on my syllabus, so to speak, help me prep for that, we'll actually create a custom learning path for you to make sure that you cover everything.

And at the moment, what's included in the learning path is stuff like the MCQs, like flashcards, and AI chat summaries, so to speak, but that is roughly it.

Yep.

And now the idea behind learning plans, sorry, behind Voice Recall, is actually to add an additional format to practice. And ideally, like a format that actually helps students really assimilate knowledge that we're trying to convey via chat, via quizzes, via flashcards. I can show you one thing, which is the prototype that Engineer built.

Yeah.

which is very rough, but I think it should help picture a bit what the idea was to start with.

Mm-hmm.

So I think she did this in cloud design.

I'm not entirely sure how she built this, but this is the overarching idea. After you finish a quiz, for instance, on, let's say, I don't know, linear algebra, fundamental or something, or after you're done with an exam plan, to really check that you understood content, we will ask you to repeat it, to tell us like, hey, If we ask you about second degree equations, can you explain it in your own words?

And if you get stuck, we'll try to provide you with a bit of context, but it's about active recall, which is a sort of pedagogical method which tends to work quite well. And this is what our engineer had in mind. you would have like Noe speaking to you, ideally. So it feels like you're chatting with a friend or like you're chatting with a tutor. And a tutor would basically ask, hey, what are the basics? Or like, how would you explain your own words? In this case, like the Renaissance or something.

And the idea that our colleagues had was to do it in a way that you would actually speak to Noe. So we would have like a sort of voice mode, probably similar to what you have in chat.

Yeah.

Hello.

voice mode, for instance, or what you used to have when it used to be full screen, that it prompts you to talk, it recognizes when you stop talking, it probably transcribes in real time.

All of those things I think we need to flick around. I think she didn't yet give much thought to that. I think it's quite a tricky thing to get right and nail so that students know, okay, Should I start talking now?

Yeah.

Yeah.

Can I still talk? Do I need to pause it? All of those things that tend to be tricky with that, I think we should figure out. But that's the idea, that you would talk and then get a bit of an answer. It will nudge you a bit further, like, okay, which era was the Renaissance, whatever. And you would keep on talking and at the end, After we've covered all the different topics that were part of your learning plan, then we would just tell you, hey, you understood most of it.

Yeah.

So we'd have a summary screen that would tell you, hey, nice work. You got 80% correct. You were able to recall 80% of the stuff that's going to be on your exam.

You're totally ready. to nail it, whatever. And that's a bit like the idea. That's like the voice self-check mode. And there's quite a bit of context in here as to what's in scope, what's out of scope.

Yeah.

I'll try to reduce it a bit 'cause I think it might be a bit overwhelming, but that's in the end, that's basically it.

Yeah.

How do we, from the learning plan slash after like a quiz, that's a bit like an entry point question, where exactly, how do we enter this node? And then two, once you're inside of that active voice recall thing, how should it look? How should it feel? Especially how should the voice interaction, the voice UX sort of look and feel like. I think that's something where A lot of design thinking would be, I think, of value, especially for colleagues.

Yeah.

Okay.

Yep, that is basically it.

Yeah.

I'll provide like in this file, in the case study brief, I'll copy over a summarized version of the user problem and of like the hypothesis, so to speak. But if we just like super quickly run through them, like user problem, is that oftentimes they study, but at the moment of the exam, they can't retrieve that knowledge. And so that's the core thing.

And also like a bit of like this feeling, I actually do know that it's like this one moment, okay, actually did get better. I did like understand like most of it. That's like the core thing. Yeah, I think. I can summarize real quick what's interesting to notice that a lot of our students use voice in our core AI chat.

Yeah.

Mm-hmm.

So it's something students like to do. But if you try out the actual app, you'll see that the voice mode is quite basic. It's just like recording a voice note and then setting it off. That's about it. So there's nothing more sophisticated going on at the moment. And yeah, the other things I think are more secondary in our approaches. in this file.

Okay.

Okay, cool.

Yep.

Okay, so I think this is a really cool challenge. Honestly, this is the first sprint that we've ever had to deal with like voice AI UX. And so I think that's really, really interesting for designers and something that also is going to be an awesome case study. Because this is something that a lot of people are experimenting with now, of course, with AI. And I think, yeah, I think what you said, like, I think it's really important to show status at every single moment, right?

Like when it's idle, when it's listening, when it's recording, when it's processing the result, I think this is something that can have a lot of user error. So system status, I think here, when it comes to UX is going to be especially important, just something for designers to really think about. I think another interesting thing is also when it comes to, you know, like a UX problem is how do we keep the student in control, right? Can they pause, you know, can they start over, you know?

These are some of the things that also need to be thought out because I think, you know, psychologically when you're, you know, When you're almost put on the spot to say something, you know, I think a lot of a lot of students might, you know, sort of just feel a little bit like, you know, they're going to pause or they're going to say something wrong and they want to start over. So there's just like a ton of things psychologically that come into recording something or, you know, answering a question with your voice.

And so I think that's something that students and designers, I think, need to also think about. A lot.

Yeah.

I think so, yep. And also, I think there's some interesting inspo out there.

Exactly.

I think, for instance, Duolingo, one thing that I think they do quite well is that they also give you the option, like, hey, I can't talk right now.

And then you can jump out of that mode because-you're stuck, how do we go about those kind of things.

I think the voice mode is pretty interesting. I think there's a couple of other players which have given a lot of thought to this, and then we can look into and try and dissect how do they go about it and what could be for our use case relevant. I think another big thing that's on our mind is a bit like this. If we were a tutor, if we were the ones sitting with a student and teaching them, and then interrogating them about, I don't know, linear algebra. What would we do if they told us they didn't know?

Would we keep on pushing? Would we say, hey, Here's a bit of a nudge.

Thank you.

Remember, it's about x squared doing something. I forgot the algebra. But will we nudge them a bit or will we just say, hey, okay, all good. Let's move on to the next topic. Will we tell you, hey, here's a bit of a summary and then show you the small summary there are before asking you again? All those things, how do we navigate those things? Are we very strict and say, hey, 10 things that are on your syllabus, we ask you once if you don't get it, we move to the next one, or how How do we navigate that?

For sure.

Yeah.

And also, I think there's a lot of technical complexity involved in that as well. But yeah, I think there's lots that we could go into. I think probably the core thing will be the voice interaction and how that should feel. And then we can go as far as we wanted to, because I think it's a complex one.

Yeah, for sure. And that's a great segue, because I do want to remind designers that, you know, you only have two and a half weeks. And this is something that, you know, as designers, we would love to explore, you know, for longer than that. But, you know, I think the mindset now is, what do we think is the first base of this that we can, you know, start testing, right?

you Yeah.

Like, of course, we're going to do this, we're going to do this, we're going to do this. of different states. And like Harry and I have been discussing, you know, all of the different affordances that we might need to think about all of those, you know, this is the system statuses that we should think about. And I think that sort of the, you know, the aspect of what would happen in real life, like Harry was saying, if you had a tutor, there's so many different paths, right?

And that's the thing about AI, like it's, it's not a really like UX is really nonlinear anymore. So there is a lot of complexity to that from the UX side and engineering side. So, you If this starts to get overwhelming, pick your battles.

Yeah.

Yeah.

What is the most important first things? What are the most obvious and recurring patterns that we think a student is going to have to go through and stick to those? There's a lot of things that we can hint at, saying, if this happens, then this happens. We don't have to fully flesh out every single use case here. Just stick to a few that we think are important.

Let others, you know, write notes for other things that you might, you know, want to consider if you had more time. But just make sure that, you know, you stay in scope with the two and a half weeks and that, you know, The mentality of like, oh, I need to ship a final product is a great mentality, but also the mentality of like, this is just the first step, right?

Yeah.

This is to understand how, you know, students are going to use this. And so, yeah. it'll be sort of like a V1 sort of to get, you know, a little bit more input from real users.

Yes, I think so.

And I would probably focus on the happy path, probably on the path where the user knows everything and nails everything. And it's just the ideal-So like scenario where we don't go off on tangents, 'cause I think our engineers are good at thinking about those edge cases.

Yeah.

I think what they are lacking, which is also like, which became evident, I think, partially in the prototype, is that like those UX interactions, like those UX subtleties and details, I think what they would most benefit from getting a take on and getting a different and different installs on. So yeah, and like maybe one quick note on the AI front, now that I think about it, bit of delay in the answers just because of how the models work.

Mm-hmm. For sure.

So I think probably it was like a loading state M on both sides.

Like this lagging for sure. Yeah, that makes a lot of sense.

Yeah.

Cool. And I mean, yeah, when we talk about edge states, we do talk a lot about thinking of non-happy paths in the sprints. But like Harry said, you don't have to design for all of these states. I think once you start creating sort of your flows, you can just pinpoint some of these edge cases, right? And user error potential states, you don't have to design all of them. But it is a good practice to just think about what can go wrong, especially if you guys want to use this for your case studies. It's going to be really interesting to it.

pinpoint some of the things that you're accounting for when it comes to voice AI. Oh. Cool. Perfect. Yeah. designers, this is a lot. Our designers are going to start like, okay, how do I even get started? But every module is going to guide you through this. We're on Discord answering questions. If something is unclear at the brief, like again, this is, we're trying to have here like the most realistic scenario, right?

Of like what a product team would do. And, you know, briefs are not perfect. Briefs are not like self-serving. Like you need to go in on Discord and ask questions, talk to other designers of what they're thinking about. You know, we're going to have Harry on Discord this time, It's the first time in the sprints that we've had an actual partner from the other side being on Discord. He's obviously busy with his own work, so he'll not, you know, he won't be available to every question that you have, but me and Alex will be there trying to answer as much as we can. If something is super unknown and you're not getting an answer, don't let us block you, you know, just like listen to your intuition, move forward with what you know.

And yeah, and I think that's sort of the best advice I can give right now. But yeah. We'll chat more and thank you so much, Harry, for all this wonderful context that you've given us and the prep work that you've done for designers to have a good base to work on.

you you you Yeah, sounds great.

Perfect.

Looking forward to it and also to the discussions in Discord. And yeah.

All right. I think that settles it. I'm going to stop the recording now. So have fun, designers.
