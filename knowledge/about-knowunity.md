# About Knowunity

Company and product background. This is not the challenge: the Design Brief
covers that. This is here so you understand the business you're designing
inside, and so Claude can reason about the wider product rather than just the
one feature.

For the technical rules that govern what you build, see
`04-platform-constraints.md`.

---

## What is Knowunity?

An AI-powered study companion for students from middle school through college.
It combines a large library of student-created content with conversational AI to
help students understand, practice, and retain what they're learning.

The study buddy who actually knows the material, available 24/7, in your pocket
and on your laptop.

## Where it came from

Founded in Berlin in 2020 by four 17-year-old students: Benedict Kurz, Gregor
Weber, Lucas Hild, and Yannik Prigl. It came out of a problem they were living
through. Tech was transforming fashion, fitness, and finance, while education
stayed one-size-fits-all and didn't speak the language of students.

It started as a place to share notes and became one of Europe's fastest-growing
AI learning platforms.

## The numbers

- 30M+ users
- Active in 15+ markets
- 380,000+ student creators contributing content
- 1 in 3 students in Germany uses the app
- Series B: €27M raised, €45M total
- Backed by XAnge, Project A, Redalpine, and angels including Booking.com
  founder Arthur Kosten

## What students can already do

Worth reading properly rather than skimming. Several of these overlap with what
you're designing, and the strongest work in this sprint will build on them
rather than around them.

- **AI Chat.** Ask anything, get step-by-step explanations. Conversational, like
  talking to a friend who's good at every subject. Voice input already exists
  here, though it's basic: record a voice note and send it.
- **Flashcards and quizzes.** Drop in any content and AI generates flashcards
  **with spaced repetition**. AI-built quizzes that target weak spots before
  exam day.
- **Summaries.** Turn dense textbooks into clear, scannable summaries.
- **Study folders.** Upload notes, slides, and textbooks, chat with AI about
  them, and generate study materials from one workspace.
- **Mock exams.** AI-generated exams that mirror the real thing.
- **Exam plans.** Give the app your exam date and syllabus and it builds a
  custom study path. This is where the June spec put voice recall.
- **Community.** Peers, study groups, shared content, questions and answers.

> Note the spaced repetition already sitting inside flashcards. The Design Brief
> asks what happens after a recall session ends, and that's the part almost
> nobody designs. The mechanic for it already exists in this product.

## How the business works

Freemium. Core features are free, and a Pro plan at $7.99/month unlocks
unlimited AI support, faster responses, enhanced personalization, and early
access to new features.

Knowunity also partners with brands for employer-branding integrations, but B2C
subscriptions are the primary revenue driver.

**Why this matters to your design.** Free students move through an exam plan in
order. That's the reason the original spec insisted the recall step be
encouraged but skippable rather than a hard gate. Anything you design that
blocks progression hits free users hardest.

## Who else is in this space

Quizlet, Duolingo, Brainly, Photomath, and a wave of newer AI-native tools.

What differentiates Knowunity is the combination of community-created content
with AI personalization, built by students for students. Duolingo in particular
is worth a look: the kickoff call cites it directly, both for how it handles
optional steps in a path and for its "I can't talk right now" escape.
