// prisma/seed.mjs
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ---- 20-term ELI5 glossary ----
const GLOSSARY = [
  { term: "Artificial Intelligence (AI)", def: "A computer that can learn and make smart guesses about things it was taught." },
  { term: "Machine Learning (ML)", def: "When a computer gets better at something by practicing with lots of examples." },
  { term: "Large Language Model (LLM)", def: "A super-big text brain that learned from lots of reading so it can chat and answer." },
  { term: "Neural Network", def: "A mathy brain made of tiny pieces that work together, like pretend neurons." },
  { term: "Transformer", def: "A model that pays attention to important words to understand meaning better." },
  { term: "Training Data", def: "All the examples (like books and websites) the AI studied to learn." },
  { term: "Model Parameters", def: "The millions of little settings in the AI’s brain that store what it learned." },
  { term: "Token", def: "A tiny piece of a word the AI reads or writes." },
  { term: "Context Window", def: "How much the AI can remember at once while talking to you." },
  { term: "Prompt", def: "Your instruction or question that tells the AI what to do." },
  { term: "Prompt Engineering", def: "Asking in a smart way so the AI gives better answers." },
  { term: "Temperature", def: "A creativity knob: low = safe and simple, high = wild and creative." },
  { term: "Inference", def: "When the AI thinks and gives an answer (not learning time)." },
  { term: "Hallucination", def: "When the AI makes up something that sounds real but isn’t true." },
  { term: "Embedding", def: "Turning text into numbers so the AI can compare meanings quickly." },
  { term: "Fine-Tuning", def: "Teaching an already-trained AI to be great at one special job." },
  { term: "Multimodal", def: "An AI that can handle more than one kind of stuff (like text and images)." },
  { term: "API", def: "A bridge that lets apps and websites talk to the AI." },
  { term: "Bias", def: "When answers lean a certain way because of the data the AI learned from." },
  { term: "Ethics in AI", def: "Making sure AI is fair, safe, and helpful for everyone." },
];

// pick 3 distinct wrong answers for a term
function pickDistractors(allTerms, correct, n = 3) {
  const pool = allTerms.filter(t => t !== correct);
  const out = [];
  while (out.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

async function main() {
  const LESSON_ID = "glossary20";

  console.log("Seeding lesson:", LESSON_ID);

  // Ensure lesson exists
  await prisma.lesson.upsert({
    where: { id: LESSON_ID },
    update: { title: "AI Starter Glossary (20 terms)" },
    create: {
      id: LESSON_ID,
      unit: "Foundations",
      title: "AI Starter Glossary (20 terms)",
      order: 1,
      summaryMdx:
        "Learn 20 core AI terms in super-simple language. Great first stop before deeper lessons.",
      videoUrl: null,
    },
  });

  // Clean old Q/A for this lesson so re-seeding is safe
  await prisma.choice.deleteMany({ where: { question: { lessonId: LESSON_ID } } });
  await prisma.question.deleteMany({ where: { lessonId: LESSON_ID } });

  // Build MCQs: “Which term matches this definition?”
  const allTerms = GLOSSARY.map(g => g.term);

  for (let i = 0; i < GLOSSARY.length; i++) {
    const { term, def } = GLOSSARY[i];
    const distractors = pickDistractors(allTerms, term, 3);

    await prisma.question.create({
      data: {
        id: `gq${i + 1}`,
        lessonId: LESSON_ID,
        type: "mcq",
        stemMdx: `**Which term matches this beginner-friendly definition?**\n\n> ${def}`,
        explanationMdx: `**Answer:** ${term}\n\nKeep this in your AI starter toolkit.`,
        difficulty: 1,
        choices: {
          create: [
            { textMdx: term, isCorrect: true },
            ...distractors.map(d => ({ textMdx: d, isCorrect: false })),
          ],
        },
      },
    });
  }

  // Optional: seed Game entries (for future tracking/XPs)
  await prisma.game.upsert({
    where: { slug: "match-maker" },
    update: {},
    create: {
      id: "game1",
      slug: "match-maker",
      title: "Mix & Match — GenAI Terms",
      description: "Drag the correct AI term onto its simple definition.",
      skills: ["vocab", "genai_basics"],
    },
  });

  await prisma.game.upsert({
    where: { slug: "crossword" },
    update: {},
    create: {
      id: "game2",
      slug: "crossword",
      title: "GenAI Mini Crossword",
      description: "Fill the grid using beginner GenAI clues.",
      skills: ["vocab", "recall"],
    },
  });

  console.log(`✅ Seeded '${LESSON_ID}' with ${GLOSSARY.length} questions`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  