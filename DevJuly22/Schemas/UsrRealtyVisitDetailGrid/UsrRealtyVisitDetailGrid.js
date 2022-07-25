define("UsrRealtyVisitDetailGrid", [], function() {
	return {
		entitySchemaName: "UsrRealtyVisit",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		messages: {
			"PleaseSetComment": {
        		mode: Terrasoft.MessageMode.PTP,
        		direction: Terrasoft.MessageDirectionType.PUBLISH
		    },
		},

		methods: {
			publish_sandbox_message: function() {
				var commentText = "test comment";
				this.sandbox.publish("PleaseSetComment", commentText, []);
			},
			init: function() {
				this.callParent(arguments);
				this.subscribeForWebsocketEvents();
				// Registering of messages
   				this.sandbox.registerMessages(this.messages);
			},
			destroy: function() {
				this.callParent(arguments);
				this.unsubscribeForWebsocketEvents();
			},
			subscribeForWebsocketEvents: function() {
				this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
					this.onWebsocketMessage, this);
			},
			unsubscribeForWebsocketEvents: function() {
				this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
					this.onWebsocketMessage, this);
			},
			
			onWebsocketMessage: function(scope, message) {
				if (!message) {
					return;
				}
				if (!message.Header) {
					return;
				}
				if (message.Header.Sender !== "AutoAddVisits") {
					return;
				}
				this.reloadGridData();
				this.publish_sandbox_message();
			}

		}
	};
});
