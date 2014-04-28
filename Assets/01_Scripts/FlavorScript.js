#pragma strict

private var sprite1 : SpriteRenderer;
public var audio1 : AudioSource;
public var t : float = 3;
private var endColor : Color = Color.white;
private var duration : float = 0.6;

function Start () {
	sprite1 = GetComponent( SpriteRenderer );
	//audio1 = GetComponent ( AudioSource );
}

function ColorTransitionGood() {
	t = 0;
	endColor = Color.green;
}

function ColorTransitionBad() {
	t = 0;
	endColor = Color.red;
}

function Eat() {
	audio1.Play();
}

function Update () {
	if (t < 1 )
	{
		sprite1.color = Color.Lerp(Color.white, endColor, t);
		t = t + Time.deltaTime/duration;
	}	
	
	if (t >= 1 && t < 2)
	{
		sprite1.color = Color.Lerp(endColor, Color.white, t-1);
		t+= Time.deltaTime/duration;
	}
}
