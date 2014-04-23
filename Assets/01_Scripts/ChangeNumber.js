function ChangeNumber ( num : int) {
	var sprite;
	if (num != 10) {
		sprite = Resources.Load("hud_" + num, Sprite);
	} else {
		sprite = Resources.Load("hud_x", Sprite);
	}
	GetComponent(SpriteRenderer).sprite = sprite;
}
