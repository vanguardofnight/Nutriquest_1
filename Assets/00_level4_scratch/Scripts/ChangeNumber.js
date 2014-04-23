function ChangeNumber ( num : int) {
	var sprite = Resources.Load("hud_" + num, Sprite);
	GetComponent(SpriteRenderer).sprite = sprite;
}
