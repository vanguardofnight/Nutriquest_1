static var PlayerScore : int;
var ScoreText = "Score: 0";
var MaxPoints : int;
var ScoreTextPosition : Rect = Rect(0, 0, 256, 128);
var style : GUIStyle;
var flavor : FlavorScript;
var particle : GameObject;

function Start()
{
	style.normal.textColor = Color.white;
	var po : GameObject = GameObject.Find("AlienMan");
	flavor = po.GetComponent(FlavorScript);
}
 
function OnTriggerEnter(other : Collider)
{
	if (other.tag != "Water")
	{	
		var cloneParticle : GameObject;
		cloneParticle = Instantiate(particle, transform.position, transform.rotation);
		cloneParticle.particleSystem.Emit(3);
		Destroy(cloneParticle,3);
	}
	if(other.tag == "Point")
	{
		PlayerScore += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	if(other.tag == "Dairy"){
		PlayerScore +=1;
		flavor.Eat();
		flavor.ColorTransitionGood();
	}
	
	if( other.tag == "Fruit"){
		PlayerScore +=1;
		flavor.Eat();
		flavor.ColorTransitionGood();
	}
	
	if( other.tag == "Grain"){
		PlayerScore += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
	}
	
	if( other.tag == "Protein"){
		PlayerScore += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
	}
	
	if( other.tag == "JunkFood"){
		PlayerScore += 1;
		flavor.Eat();
		flavor.ColorTransitionBad();
	}
	
	Debug.Log(other.gameObject.name);
}
 
function Update()
{
	ScoreText = "Score: " + PlayerScore;
	GUI.Label(ScoreTextPosition, ScoreText, style);
}
 
function OnGUI()
{
	GUI.Label(ScoreTextPosition, ScoreText, style);
}