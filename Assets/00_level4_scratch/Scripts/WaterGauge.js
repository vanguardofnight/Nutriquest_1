#pragma strict

private var defaultScale = 1;

function Start () {
	defaultScale = transform.localScale.x;
}

function Resize ( waterlevel: double, maxwater: double ) {
	transform.localScale.x = waterlevel * defaultScale / maxwater;
}