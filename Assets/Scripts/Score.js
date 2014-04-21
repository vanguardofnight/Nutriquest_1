static var PlayerScore : int;
var ScoreText = "Score: 0";
var MaxPoints : int;
var ScoreTextPosition : Rect = Rect(0, 0, 256, 128);
var style : GUIStyle;

function Start()
{
	style.normal.textColor = Color.white;
}
 
function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Point")
	{
		PlayerScore += 1;
		Destroy(other.gameObject);
	}
	if(other.tag == "Dairy"){
		PlayerScore +=1;
	}
	
	if( other.tag == "Fruit"){
		PlayerScore +=1;
	}
	
	if( other.tag == "Grain"){
		PlayerScore += 1;
	}
	
	if( other.tag == "Protein"){
		PlayerScore += 1;
	}
	
	if( other.tag == "JunkFood"){
		PlayerScore += 1;
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