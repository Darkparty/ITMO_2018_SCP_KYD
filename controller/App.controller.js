sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/unified/DateRange"
], function (Controller, DateRange) {
	"use strict";
	return Controller.extend("sap.ui.MyCalendar.controller.App", {
		onInit: function() {
			var req = new XMLHttpRequest();
			req.open('GET', '/resourse/calendar.xml', false); 
			req.send(null);
			var response;
			if(req.status == 200) {
  				response = req.responseText;
			}

			var oXMLModel =  new sap.ui.model.xml.XMLModel();
			oXMLModel.setXML(response);
			var oCalendar   = this.getView().byId("calendar");
			var holidays = new Array();
			for (var i = 0; i < 8; i++){
				holidays[i+1] = oXMLModel.getProperty("/holidays/holiday/" + i + "/@title");
			}
			try{
				for (var i = 0; i < 100; i++){
					if (oXMLModel.getProperty("/days/day/" + i +"/@h") != null){
						oCalendar.addSpecialDate(
							new sap.ui.unified.DateTypeRange({
  							startDate : new Date(2018, oXMLModel.getProperty("/days/day/" + i + "/@d").substring(0,2)-1,
 							oXMLModel.getProperty("/days/day/" + i +"/@d").substring(3 ,5)),
 							type   : sap.ui.unified.CalendarDayType.Type06,
 		 					tooltip   : holidays[oXMLModel.getProperty("/days/day/" + i +"/@h")]
 			 				})
 			 			);
					} else {
						if (oXMLModel.getProperty("/days/day/" + i + "/@t") == 1){
						oCalendar.addSpecialDate(
							new sap.ui.unified.DateTypeRange({
  							startDate : new Date(2018, oXMLModel.getProperty("/days/day/" + i + "/@d").substring(0,2)-1,
 							oXMLModel.getProperty("/days/day/" + i +"/@d").substring(3 ,5)),
 							type   : sap.ui.unified.CalendarDayType.NonWorking
 		 					})
 			 			);
						}

						if (oXMLModel.getProperty("/days/day/" + i + "/@t") == 2){
						oCalendar.addSpecialDate(
							new sap.ui.unified.DateTypeRange({
  							startDate : new Date(2018, oXMLModel.getProperty("/days/day/" + i + "/@d").substring(0,2)-1,
 							oXMLModel.getProperty("/days/day/" + i +"/@d").substring(3 ,5)),
 							type   : sap.ui.unified.CalendarDayType.Type20,
 							tooltip : "Рабочий и сокращенный."
 		 					})
 			 			);
						}
					}		
				}
			} catch(e){}
		}
	});
});



