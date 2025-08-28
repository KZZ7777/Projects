import { Router} from "express";

export default function todoRouter(){
const router = Router();

// simpele in-memory storage
let todos: { id: number; text: string; done: boolean }[] = [
  { id: 1, text: "Voorbeeld taak", done: false },
];

// Lijst tonen
router.get("/", (_req, res) => {
  res.render("index", { todos });
});

// Toevoegen
router.post("/add", (req, res) => {
  const text = (req.body.text || "").trim();
  if (text) todos.push({ id: Date.now(), text, done: false });
  res.redirect("/");
});

// Toggle done
router.post("/toggle", (req, res) => {
  const id = Number(req.body.id);
  todos = todos.map(t => (t.id === id ? { ...t, done: !t.done } : t));
  res.redirect("/");
});

// Verwijderen
router.post("/delete", (req, res) => {
  const id = Number(req.body.id);
  todos = todos.filter(t => t.id !== id);
  res.redirect("/");
});

return router;
}