import { Request, Response } from "express";

import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  startAfter,
} from "firebase/firestore/lite";
import app from "../middlewares/firebase";

const db = getFirestore(app);

export async function getDeliveriesFilterById(req: Request, res: Response) {
  const { id } = req.params;

  const deliveries = await collection(db, "deliveries");
  const deliveriesSnapshot = await getDocs(deliveries);

  const deliveriesList = deliveriesSnapshot.docs
    .map((doc) => doc.data())
    .filter((doc) => doc.id == id);
  return res.status(200).json(deliveriesList);
}

export async function getDeliveriesPaginated(req: Request, res: Response) {
  // Query the first page of docs
  const first = query(
    collection(db, "deliveries"),
    orderBy("creation_date"),
    limit(2)
  );
  const documentSnapshots = await getDocs(first);

  // Get the last visible document
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  console.log("last", lastVisible);

  // Construct a new query starting at this document, get the next 2 deliveries.
  const next = query(
    collection(db, "deliveries"),
    orderBy("creation_date"),
    startAfter(lastVisible),
    limit(2)
  );

  return res.status(200).json(next);
}
