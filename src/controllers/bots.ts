import { Request, Response } from "express";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import app from "../middlewares/firebase";

const db = getFirestore(app);

export async function addBot(req: Request, res: Response) {
  let data = req.body;
  data.id = dbPushKey("bots");

  const botsCollectionRef = collection(db, "bots");

  const newBotRef = doc(botsCollectionRef);

  await setDoc(newBotRef, data)
    .then(() => {
      return res.status(200).json("Bot added successfully");
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
}

export async function getBotsByZone(req: Request, res: Response) {
  const { idZone } = req.params;
  const bots = await collection(db, "bots");

  const botsSnapshot = await getDocs(bots);

  const botsList = botsSnapshot.docs
    .map((doc) => doc.data())
    .filter((obj) => obj.zone_id === idZone);

  return res.status(200).json(botsList);
}

export async function assingOrderToBot(req: Request, res: Response) {
  let data = req.body;
  data.id = dbPushKey("deliveries");

  const orderCollectionRef = collection(db, "deliveries");
  const newOrderRef = doc(orderCollectionRef);
  let botsAvaliables = await getBotsAvailables();

  if (botsAvaliables.length > 0) {
    //New field where we save the bot data of the assigned bot to take following
    // data.botAssing = {}
    data.botAssing = await getNearestBot(data.pickup.lat, data.pickup.lon);

    //We assing a bot, the bot status changes. 
    /*
    Funcion not finished,
    presents problement making the update of the state bot and 
    create a new docuement 
    await updateBotState(data.botAssing.id)
      .then(() => {
        console.log("Bot state updated to busy");
      })
      .catch((err) => {
        console.log(err);
      });
    */

    await setDoc(newOrderRef, data)
      .then(() => {
        return res.status(200).json("Order saved successfully");
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } else {
    return res.status(204).json("We sorry, there is no bots availables");
  }
}

async function getBotsAvailables() {
  const bots = await collection(db, "bots");
  const botsSnapshot = await getDocs(bots);

  let botsList = botsSnapshot.docs
    .map((doc) => doc.data())
    .filter((obj) => obj.status === "available");

  return botsList;
}

// Generate new unique ID using push()
function dbPushKey(collectionName: string) {
  const botsCollectionRef = collection(db, collectionName);
  const newDocRef = doc(botsCollectionRef);
  return newDocRef.id;
}

async function updateBotState(botReference: any) {
  console.log(botReference);
  const botRef = await doc(db, "bots", botReference);

  const data = {
    status: "busy",
  };

  updateDoc(botRef, data)
    .then(() => {
      console.log("Bot status update successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

function rad(x: number) {
  return (x * Math.PI) / 180;
}
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6378.137; //Earth radius KM
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //distance in meters. Conversion 1Km =1000m
  var d = R * c * 1000;
  return d;
}

async function getNearestBot(lonOrder: number, latOrder: number) {
  let botsAvailable = await getBotsAvailables();
  let nearestBot;
  let nearestDistance = Infinity;

  botsAvailable.forEach((bot) => {
    const distance = getDistance(
      bot.location.lat,
      bot.location.lon,
      latOrder,
      lonOrder
    );
    if (distance < nearestDistance) {
      nearestBot = bot;
      nearestDistance = distance;
    }
  });

  return nearestBot;
}
