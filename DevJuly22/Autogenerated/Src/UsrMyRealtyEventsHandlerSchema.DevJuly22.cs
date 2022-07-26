namespace Terrasoft.Configuration
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;

	#region Class: UsrMyRealtyEventsHandlerSchema

	/// <exclude/>
	public class UsrMyRealtyEventsHandlerSchema : Terrasoft.Core.SourceCodeSchema
	{

		#region Constructors: Public

		public UsrMyRealtyEventsHandlerSchema(SourceCodeSchemaManager sourceCodeSchemaManager)
			: base(sourceCodeSchemaManager) {
		}

		public UsrMyRealtyEventsHandlerSchema(UsrMyRealtyEventsHandlerSchema source)
			: base( source) {
		}

		#endregion

		#region Methods: Protected

		protected override void InitializeProperties() {
			base.InitializeProperties();
			UId = new Guid("e03aea66-8ef4-4c98-b871-64e5211c1d15");
			Name = "UsrMyRealtyEventsHandler";
			ParentSchemaUId = new Guid("50e3acc0-26fc-4237-a095-849a1d534bd3");
			CreatedInPackageId = new Guid("4a3d6284-4134-4df6-82e7-ac15e2a44162");
			ZipBody = new byte[] { 31,139,8,0,0,0,0,0,4,0,83,208,211,211,3,0,43,31,116,100,4,0,0,0 };
		}

		#endregion

		#region Methods: Public

		public override void GetParentRealUIds(Collection<Guid> realUIds) {
			base.GetParentRealUIds(realUIds);
			realUIds.Add(new Guid("e03aea66-8ef4-4c98-b871-64e5211c1d15"));
		}

		#endregion

	}

	#endregion

}

