define("UsrExpenseNotes_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"color": "transparent",
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				}
			},
			{
				"operation": "merge",
				"name": "LeftAreaContainer",
				"values": {
					"columns": [
						"minmax(64px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					}
				}
			},
			{
				"operation": "merge",
				"name": "ControlGroupContainer",
				"values": {
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Button_7xc9o2i",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_7xc9o2i_caption)#",
					"color": "default",
					"disabled": false,
					"size": "large",
					"iconPosition": "only-text",
					"clicked": {
						"request": "crt.LoadDataRequest"
					},
					"clickMode": "default"
				},
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrName",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrName",
					"control": "$UsrName",
					"multiline": false,
					"labelPosition": "auto",
					"placeholder": "",
					"tooltip": ""
				},
				"parentName": "LeftAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_6gwm262",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 2,
						"rowSpan": 5
					},
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"items": [],
					"color": "transparent",
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					}
				},
				"parentName": "ControlGroupContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_87y93nj",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"control": "$NumberAttribute_5hxnfui",
					"label": "$Resources.Strings.NumberAttribute_5hxnfui",
					"labelPosition": "auto",
					"placeholder": "#ResourceString(NumberInput_87y93nj_placeholder)#"
				},
				"parentName": "GridContainer_6gwm262",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_h6fq4v1",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"loading": false,
					"control": "$LookupAttribute_rw7uias",
					"label": "$Resources.Strings.LookupAttribute_rw7uias",
					"labelPosition": "auto",
					"listActions": [],
					"showValueAsLink": true,
					"controlActions": [],
					"placeholder": ""
				},
				"parentName": "GridContainer_6gwm262",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ListAction_111xlwm",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "ComboBox.AddNewRecord",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_h6fq4v1",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ControlAction_2fd582p",
				"values": {
					"code": "goToRecordList",
					"type": "crt.ComboboxAction",
					"icon": "combobox-go-to-source",
					"caption": "ComboBox.IsGoToSourceAllowedTooltip",
					"clicked": {
						"request": "crt.OpenLookupSourceRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_h6fq4v1",
				"propertyName": "controlActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_2a21dgq",
				"values": {
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"loading": false,
					"control": "$LookupAttribute_swje304",
					"label": "$Resources.Strings.LookupAttribute_swje304",
					"labelPosition": "auto",
					"listActions": [],
					"showValueAsLink": true,
					"controlActions": [],
					"placeholder": ""
				},
				"parentName": "GridContainer_6gwm262",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "addRecord_hxy4co8",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_hxy4co8_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_2a21dgq",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ControlAction_q6lg066",
				"values": {
					"code": "goToRecordList",
					"type": "crt.ComboboxAction",
					"icon": "combobox-go-to-source",
					"caption": "ComboBox.IsGoToSourceAllowedTooltip",
					"clicked": {
						"request": "crt.OpenLookupSourceRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_2a21dgq",
				"propertyName": "controlActions",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{
			"attributes": {
				"UsrName": {
					"modelConfig": {
						"path": "PDS.UsrName"
					}
				},
				"Id": {
					"modelConfig": {
						"path": "PDS.Id"
					}
				},
				"NumberAttribute_5hxnfui": {
					"modelConfig": {
						"path": "PDS.UsrAmountUSD"
					}
				},
				"LookupAttribute_rw7uias": {
					"modelConfig": {
						"path": "PDS.UsrStatus"
					}
				},
				"LookupAttribute_swje304": {
					"modelConfig": {
						"path": "PDS.UsrOwner"
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "UsrExpenseNotes"
					},
					"scope": "page"
				}
			},
			"primaryDataSourceName": "PDS"
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});