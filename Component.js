sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";
	return UIComponent.extend("sap.ui.MyCalendar.Component", {
		metadata : {
			rootView : "sap.ui.MyCalendar.view.App",
			includes: ["../css/style.css"]
		}
	});
});
