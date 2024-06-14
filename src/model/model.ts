export interface ICompanies {
	companies?: ICompany[];
	limit?: number;
	offset?: number;
}

export interface ICompany {
	company: {
		companyId: string;
	};
	customerMarkParameters: {
		loyaltyLevel: {
			cashToMark: number;
			markToCash: number;
			name: string;
			number: number;
			requiredSum: number;
		};
		mark: number;
	};
	mobileAppDashboard: {
		accentColor: string;
		backgroundColor: string;
		cardBackgroundColor: string;
		companyName: string;
		highlightTextColor: string;
		logo: string;
		mainColor: string;
		textColor: string;
	};
}
