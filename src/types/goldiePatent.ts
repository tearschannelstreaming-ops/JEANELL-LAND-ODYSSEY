export interface PatentClaim {
  claimNumber: number;
  type: 'independent' | 'dependent';
  dependsOn?: number;
  text: string;
  summary: string;
}

export interface PatentDrawingFigure {
  figNumber: string;
  title: string;
  description: string;
  elements: string[];
}

export interface CoOpEquityFormula {
  variable: string;
  name: string;
  definition: string;
}

export interface GoldiePatentApplicationData {
  docketNumber: string;
  applicationType: string;
  filingDate: string;
  title: string;
  inventor: {
    name: string;
    residence: string;
    citizenship: string;
    ptin: string;
    phone: string;
    email: string;
  };
  assignee: {
    legalName: string;
    ein: string;
    samUei: string;
    website: string;
    address: string;
  };
  classification: {
    usptoClasses: string[];
    cpcCodes: string[];
  };
  abstract: string;
  technicalField: string;
  backgroundAndPriorArt: string[];
  inventiveObjectives: string[];
  briefDescriptionOfDrawings: PatentDrawingFigure[];
  detailedDescriptionSections: {
    sectionId: string;
    title: string;
    paragraphs: string[];
  }[];
  equityLeaseAlgorithm: {
    formulaLatex: string;
    explanation: string;
    variables: CoOpEquityFormula[];
  };
  claims: PatentClaim[];
  statutoryDeclaration: {
    statement: string;
    powerOfAttorney: string;
    verificationDate: string;
  };
}
