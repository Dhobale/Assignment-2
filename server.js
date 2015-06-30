var et = require('elementtree');
var fs = require('fs');
var obj, i, j, value, temp, studentId, fName, lName, etree, xml, root;
var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

fs.readFile('student.json', 'utf8', function (err, data) {
	if (err) {
		return console.error("Error : " + err);	
	} 
	obj = JSON.parse(data);
	// Part 1
	fs.open('destination.txt','w+', function(err) {
   		if (err) {
       		return console.error(err);
   		}
		fs.appendFile('destination.txt','First Name | Last Name | Score'+"\r\n",function(err,fd){
			if (err) {
	       		return console.error(err);
	       	}
	       	obj = JSON.parse(data);
	       	for(i=0;i<obj.students.length;i++){
	       		value = obj.students[i].id+" | "+obj.students[i].fName+" | "+obj.students[i].lName+" | "+obj.students[i].score;
				fs.appendFile('destination.txt',value+"\r\n", function(err,fd) {
					if (err) {
	       				return console.error(err);
	      			}
	      		});
	      	}
	    });
	    console.log("Output file destination.txt.....!!!!");
	});
	// Part 2
	function sortObject(obj) {
		for (i = 0; i < obj.students.length; i += 1){
		    for (j = 0; j < (obj.students.length - i - 1); j += 1) {
		    	if (obj.students[j].score < obj.students[j + 1].score) {
			        temp = obj.students[j];
			        obj.students[j] = obj.students[j + 1];
			        obj.students[j + 1] = temp;
		        }
		  	}
	    }
	    return obj;
	}

	fs.open('descending.txt','w+', function(err) {
		if (err) {
   			return console.error(err);
		}
		fs.appendFile('descending.txt', 'First Name | Last Name | Score' + "\r\n", function(err) {
			if (err) {
	       		return console.error(err);
	       	}	
			obj = sortObject(obj);       	
	        for (i = 0; i < obj.students.length; i += 1) {
	       		value = obj.students[i].id + " | " + obj.students[i].fName + " | " + obj.students[i].lName + " | " + obj.students[i].score;
				fs.appendFile('descending.txt', value + "\r\n", function(err,fd) {
					if (err) {
	       				return console.error(err);
	      			}
	      		});
	      	}
   		});
   		console.log("Output file descending.txt.....!!!!");
	});
	// Part 3
	fs.open('descendingXML.xml','w+',function(err,out) {
		if (err) {
			return console.error(err);
		}
  		obj = sortObject(obj);       	
	    root = element('students');
	    for (i = 0; i < obj.students.length; i += 1) {
	        studentId = subElement(root, 'student');
	        studentId.set('id', obj.students[i].id);
	        fName = subElement(studentId, 'fName');
	        fName.text = obj.students[i].fName;
	        lName = subElement(studentId, 'lName');
	        lName.text = obj.students[i].lName;
	        score = subElement(studentId, 'score');
	        score.text = obj.students[i].score;
	    }
	    etree = new ElementTree(root);
	    xml = etree.write({'xml_declaration': false});
	    fs.appendFile('descendingXML.xml',xml, function(err) {
			if (err) {
	       		return console.error(err);
	      	}
	   	});
	    console.log("Output file descendingXML.txt.....!!!!");
    });
});

console.log("End Program....!!!");