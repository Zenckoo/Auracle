-- 🗂️ Organize card: the order of the 4 movable parts of the card, and which are hidden.
-- Example: "tastes,about,-blessings,traits" (a "-" in front means hidden). NULL: the default order.
ALTER TABLE profiles ADD COLUMN card_layout TEXT;
