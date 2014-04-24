#pragma strict

var particle : ParticleSystem;

function Start () {
	particle = GetComponent ( ParticleSystem );
}

function Update () {
	
}

function OnDisable() {
	particle.Emit(3);	
}