import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEFAULT_MATCH, MATCH_DOC_ID } from "@/lib/config";
import { calculatePoints } from "@/lib/scoring";
import type { Match } from "@/types";

const matchRef = doc(db, "match", MATCH_DOC_ID);
const predictionsRef = collection(db, "predictions");

export function subscribeMatch(callback: (match: Match) => void) {
  return onSnapshot(matchRef, (snap) => {
    callback(snap.exists() ? (snap.data() as Match) : DEFAULT_MATCH);
  });
}

export async function saveMatch(match: Partial<Match>) {
  await setDoc(matchRef, match, { merge: true });
}

export async function updateResult(resultHome: number, resultAway: number) {
  await updateDoc(matchRef, {
    resultHome,
    resultAway,
    status: "finished",
  });

  const snapshot = await getDocs(predictionsRef);
  const batch = writeBatch(db);

  snapshot.forEach((document) => {
    const data = document.data();
    const points = calculatePoints(
      data.scoreBrazil,
      data.scoreOpponent,
      resultHome,
      resultAway
    );
    batch.update(document.ref, { points });
  });

  await batch.commit();
}
