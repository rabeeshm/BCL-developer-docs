var textlistin;
var HTMLlist;
var forout;
var Linearray;
var Wordarray;
var linebuild;
var rowcount;
var test1;
var columncount;
var index;
var index2;
var arrayname;

function getresults()
{
arrayname = document.myForm.arrayname.value;	
textlistin = document.myForm.textlistin.value;
forout = "var " + arrayname + " = [";

Linearray = textlistin.split("\n");
rowcount = Linearray.length;
for (var index = 0; index < rowcount; index++)
{
if (index === 0) {
    linebuild = "'" + Linearray[index] + "'";
} else { 
    linebuild = ",'" + Linearray[index] + "'";
}	
forout = forout + linebuild;
}


forout = forout + "];";
document.myForm.HTMLlist.value = forout;
}


function cleartextboxes()
{
document.myForm.textlistin.value = "";
document.myForm.HTMLlist.value = "";
document.myForm.arrayname.value = "";
}

