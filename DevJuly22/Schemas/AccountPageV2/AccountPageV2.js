define("AccountPageV2", [], function() {
	return {
		entitySchemaName: "Account",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "INTEGER352b7446-067e-4ccb-8e41-0af91cf3cc3b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "AccountPageGeneralInfoBlock"
					},
					"bindTo": "UsrWebsiteCode",
					"enabled": true
				},
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "remove",
				"name": "AlternativeName"
			}
		]/**SCHEMA_DIFF*/
	};
});
