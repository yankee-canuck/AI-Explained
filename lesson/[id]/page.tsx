import { prisma } from "@/lib/prisma";
import LessonView from "@/components/LessonView";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { questions: { include: { choices: true }, orderBy: { id: "asc" } } },
  });
  if (!lesson) return notFound();
  return <LessonView lesson={lesson} />;
}
