export type HoldingSpaceCategory = 'Essay' | 'Note'

export type HoldingSpaceEntry = {
  slug: string
  title: string
  category: HoldingSpaceCategory
  date: string
  heroImage: {
    light: string
    dark: string
  }
  body: string
}

export const holdingSpaceEntries: HoldingSpaceEntry[] = [
  {
    slug: 'the-moments-we-create',
    title: 'The Moments We Create',
    category: 'Essay',
    date: '2026-07-15T01:36:00',
    heroImage: {
      light: 'placeholder-square',
      dark: 'placeholder-square',
    },
    body: `One lesson I've picked up from people I've met: we create moments for ourselves that end up shaping how we think, how we carry ourselves, what we expect from life. The opposite is just as true. If you don't create them on purpose, someone or something else will create them for you, and you won't necessarily like what you end up with.

A good friend of mine told me about a moment like this once. She was young, and she saw a woman across the street. Dressed smartly, driving a nice sports car, completely alone. Nothing special happens in that scene if you're watching it from the outside. A woman gets in a car. But my friend didn't just see it, she took it. She imagined herself as that woman. Independent. No one holding anything over her head. Put together, on her own terms.

That was it. One picture, held onto.

Life didn't go easy on her after that. It rarely does. But she never let the image go. She's 41 now, and she still has it exactly as clear as the day she saw it; she's told me so herself. And here's the part that actually gets me: she's become that woman. The car, the way she dresses, the fact that she answers to no one. She didn't get there by accident. She got there because she decided, once, quietly, that this was the picture she was going to keep coming back to.

I think that's how most of the moments that actually shape a life work. They're rarely the loud ones. Nobody's filming the moment someone decides who they're going to become. It happens once, in private, and then it just gets returned to, on the good days and the bad ones, until eventually it's not a picture anymore. It's just who you are.

I've noticed the same thing in myself with things that have nothing to do with identity on the surface; training, work, patterns I'm trying to learn. The insight always looks sudden from the outside. It never is. Someone was quietly rehearsing that exact moment long before it looked like anything to anyone watching.

So here's what I'd tell anyone: find the picture. The version of yourself you actually want to become, not the vague "better" version everyone says they want, but a specific one. A scene, an image, a way of standing in the world. Hold onto it. Don't explain it to people who won't get it. Just keep returning to it, especially when nothing about your current situation resembles it yet.

Reality is what you make of it. You either shape it on purpose, or you let everyone and everything else shape it for you. My friend picked the first option at an age when most people aren't even paying attention. That's the whole lesson, really. It's not complicated. It's just rare.`,
  },
  {
    slug: 'attention-and-pattern-recognition',
    title: 'Attention and Pattern Recognition',
    category: 'Note',
    date: '2026-07-15T01:35:00',
    heroImage: {
      light: 'placeholder-square',
      dark: 'placeholder-square',
    },
    body: `### Two systems, not one

I used to think attention and pattern recognition were the same skill. They're not. I can hold a conversation and stay completely present - someone's talking, the information's coming at me live, there's feedback in real time, and my attention just locks in. But put me alone with a task where I have to generate the next step myself, where there's no immediate feedback, and I drift. That's not a discipline problem. It's that self-directed attention and externally-pulled attention are two different muscles, and I'm stronger in one than the other.

### The date problem

A while back I was working through something involving benefit start dates - waiting periods, effective dates, eligibility. I understood it almost immediately, without really working it out step by step. Looking back, I think what happened wasn't calculation. It was compression. My brain had already seen "start date -> waiting period -> effective date -> eligibility" enough times that it collapsed the whole chain into one rule. Instead of walking A to B to C to D, I just saw A to D. That's what experienced developers, investors, and chess players are actually doing when they look fast - they're not thinking faster, they're recognizing a shape they've seen before.

### What pattern recognition actually is

Stripped down, it's just noticing when two different-looking things are actually the same thing underneath. Amazon in 2005, Nvidia in 2016, SpaceX now - most people see three unrelated companies. But there's one pattern sitting under all three: large market, real technological edge, founder-led, long runway. Once you see the pattern once, you start seeing it everywhere, and that's the whole game in investing - it's not prediction, it's not IQ, it's recognizing structures you've already catalogued.

### Where AI becomes the multiplier

I'm good at intuition and judgment - noticing that something feels like a pattern. I'm not good at processing enormous amounts of data or holding a hypothesis up against thousands of data points. That's where a Python pipeline and Claude Code come in. I get a feeling - "founder-led companies seem to outperform" - and instead of leaving it as a feeling, I can actually test it. Pull the data, run it, see if the pattern holds. That turns intuition into evidence, which is a completely different thing to be holding onto.

### The actual bottleneck

The honest answer is that my limiting factor was never pattern recognition. It's sustained focus on *one* pattern long enough for it to compound. Ideas are cheap once you're wired to notice structure - I can spot ten interesting patterns a week. What's rare is staying on one of them for a hundred hours instead of chasing all ten. That's the difference between having ideas and having expertise.`,
  },
]

export function getHoldingSpaceEntry(slug: string | undefined) {
  return holdingSpaceEntries.find((entry) => entry.slug === slug)
}
