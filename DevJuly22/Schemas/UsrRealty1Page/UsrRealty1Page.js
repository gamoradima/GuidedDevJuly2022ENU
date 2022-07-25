define("UsrRealty1Page", ["RightUtilities"], function(RightUtilities) {
	return {
		entitySchemaName: "UsrRealty",
		attributes: {
			"CanEditPrice": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"CommissionUSD": {
				dataValueType: Terrasoft.DataValueType.FLOAT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 0.0,
				dependencies: [
					{
						columns: ["UsrPriceUSD", "UsrOfferType"],
						methodName: "calculateCommission"
					}
				]
			},
			"UsrOfferType": {
				lookupListConfig: {
					columns: ["UsrCommissionMultiplier"]
				}
			},
			"UsrOwner": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				lookupListConfig: {
					filters: [
                        function() {
                            var filterGroup = Ext.create("Terrasoft.FilterGroup");
                            //Select all records for which Active=true from the [Contact] root schema to which the [Active] column from the [SysAdminUnit] schema is joined. */
                            filterGroup.add("IsActive",
                                Terrasoft.createColumnFilterWithParameter(    			// select some-cols FROM Contact JOIN sysAdminUnit SA on SA.ContactId = Contact.Id
                                    Terrasoft.ComparisonType.EQUAL,						// WHERE SA.Active = true
                                    "[SysAdminUnit:Contact:Id].Active",
                                    true));
                            return filterGroup;
                        }
					]
				}
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrRealtyFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrRealty"
				}
			},
			"UsrSchema9f828d7aDetailfc2268d6": {
				"schemaName": "UsrRealtyVisitDetailGrid",
				"entitySchemaName": "UsrRealtyVisit",
				"filter": {
					"detailColumn": "UsrParentRealty",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrComment": {
				"67f1e9b2-bd81-493f-974b-fc6d42f15c96": {
					"uId": "67f1e9b2-bd81-493f-974b-fc6d42f15c96",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrPriceUSD"
							},
							"rightExpression": {
								"type": 0,
								"value": 1000000,
								"dataValueType": 5
							}
						}
					]
				}
			},
			"UsrCity": {
				"e4e1a25b-7f11-47bc-abe2-12fedbaaa122": {
					"uId": "e4e1a25b-7f11-47bc-abe2-12fedbaaa122",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Country",
					"comparisonType": 3,
					"autoClean": true,
					"autocomplete": true,
					"type": 1,
					"attribute": "UsrCountry"
				}
			},
			"UsrPriceUSD": {
				"282e1e88-f1f7-43e9-8d7b-aec0c29f71a1": {
					"uId": "282e1e88-f1f7-43e9-8d7b-aec0c29f71a1",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "CanEditPrice"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		messages: {
			"PleaseSetComment": {
        		mode: Terrasoft.MessageMode.PTP,
        		direction: Terrasoft.MessageDirectionType.SUBSCRIBE
		    },
		},

		methods: {
			init: function() {
				this.callParent(arguments);
				// Registering of messages
				this.sandbox.registerMessages(this.messages);
				this.sandbox.subscribe("PleaseSetComment", this.setCommentValue, this, []);
			},
			setCommentValue: function(commentText) {
				this.console.log("Message subscriber called.");
				this.set("UsrComment", commentText);
			},
			
			setValidationConfig: function() {
                /* Call the initialization of the parent view model's validators. */
                this.callParent(arguments);
                /* Add the dueDateValidator() validator method for the [DueDate] column. */
                this.addColumnValidator("UsrPriceUSD", this.positiveValueValidator);
                this.addColumnValidator("UsrArea", this.positiveValueValidator);
			},
			positiveValueValidator: function(value, column) {
				var msg = "";
				if (value < 0) {
					msg = this.get("Resources.Strings.ValueMustBeGreaterThanZero");
				}
				return {
					invalidMessage: msg
				};
			},
			
			calculateCommission: function() {
				var price = this.get("UsrPriceUSD");
				if (!price) {
					price = 0;
				}
				var offerTypeObject = this.get("UsrOfferType");
				var multiplier = 0;
				if (offerTypeObject) {
					multiplier = offerTypeObject.UsrCommissionMultiplier;
				}
				var commission = price * multiplier;
				this.set("CommissionUSD", commission);
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.setCanEditPriceAttribute();
				this.calculateCommission();
			},		
			
			setCanEditPriceAttribute: function() {
				RightUtilities.checkCanExecuteOperation({
					operation: "CanChangeRealtyPrice"
				}, this.getPriceOperationResult, this);
			},

			getPriceOperationResult: function(result) {
				this.set("CanEditPrice", result);
			},
			
			onMyButtonClick: function() {
				this.console.log("My button pressed.");
				this.showInformationDialog("MY BUTTON was pressed!");
				
				var realtyTypeObject = {
					value: "98f8b41a-341a-45ed-b47a-10e6852be8e2",
					displayValue: "2. House"
				};
				this.set("UsrType", realtyTypeObject);
				
				
			},
			getMyButtonEnabled: function() {
				var result = true;
				//
				return result;
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName6f971895-1154-43c2-b797-f479d13a62f4",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FLOAT25c91feb-788b-4ebd-8c20-b34ba2ee99f1",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPriceUSD",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOAT24ffece9-64e1-4d19-ad05-fd2cad7d6442",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrArea",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CommissionControl",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CommissionUSD",
					"enabled": false,
					"caption": {
						"bindTo": "Resources.Strings.CommissionCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MyButton",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.MyButtonCaption"
					},
					"click": {
						"bindTo": "onMyButtonClick"
					},
					"enabled": {
						"bindTo": "getMyButtonEnabled"
					},
					"style": "blue"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "LOOKUP3233d76a-d754-440e-8765-d40f53396056",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP2733fbf6-db1b-4157-aed6-e8e534d3bf79",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrOfferType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "STRING7363d254-4cdf-4d52-bd59-5fa806d53ae9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP4365f69a-fdbc-4b22-903c-137f1d20ec70",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrCountry",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUPbc86c8a7-eadb-4870-be86-e33d0c417ef0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrCity",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "LOOKUP1d8d7491-6965-47e2-9c3e-4d8418e261a5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrOwner",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "TabVisits",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabVisitsTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema9f828d7aDetailfc2268d6",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "TabVisits",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
