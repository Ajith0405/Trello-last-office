import express from "express";
import { Board } from "../../entities/Board";
import { Card } from "../../entities/Card";
import { List } from "../../entities/List";

const router = express.Router();

router.post("/createCard", async (req, res) => {
  const { listId, boardId, originListTitle, cardContent, cardActivity } = req.body;

  try {
    const getBoard = await Board.findOne({ where: { id: boardId } });
    const getList = await List.findOne({ where: { id: listId } });

    const newCard = Card.create({
      card_content: cardContent,
      origin_list_title: originListTitle,
      card_activity:[cardActivity],
      board: getBoard as Board,
      list: getList as List,
    });

    await newCard.save();
    return res.json({
        card:newCard,
        msg:"card created successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: "Network error",
    });
  }
});

export { router as createCardRouter };
