import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Prediction } from "@/types";

const predictionsRef = collection(db, "predictions");

export interface NewPrediction {
  name: string;
  scoreBrazil: number;
  scoreOpponent: number;
}

export async function addPrediction(input: NewPrediction): Promise<string> {
  const docRef = await addDoc(predictionsRef, {
    ...input,
    createdAt: Date.now(),
    points: 0,
  });
  return docRef.id;
}

export async function updatePrediction(
  id: string,
  input: Omit<NewPrediction, "name">
): Promise<void> {
  await updateDoc(doc(db, "predictions", id), input);
}

export function subscribePredictions(
  callback: (predictions: Prediction[]) => void
) {
  const q = query(predictionsRef, orderBy("points", "desc"));

  return onSnapshot(q, (snap) => {
    const items = snap.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as Prediction
    );
    items.sort((a, b) => b.points - a.points || a.createdAt - b.createdAt);
    callback(items);
  });
}
