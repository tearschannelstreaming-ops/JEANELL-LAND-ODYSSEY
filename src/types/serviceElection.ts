export type JeanellServiceCategory =
  | 'tax_preparation'
  | 'real_estate_deals'
  | 'onestop_nonprofit'
  | 'insurance_risk'
  | 'securities_wealth'
  | 'stear_safe_transit'
  | 'goldies_beauty_world'
  | 'ai_training'
  | 'project_management'
  | 'notary_public'
  | 'cdl_transportation';

export interface ServiceElectionItem {
  id: string;
  title: string;
  category: JeanellServiceCategory;
  leadProfessional: string;
  leadTitle: string;
  credentials: string[];
  description: string;
  pricingType: 'fixed' | 'contingent' | 'hourly' | 'free_nonprofit' | 'tax_deductible_donation';
  estimatedPrice: string;
  deliverables: string[];
  statutoryAuthority: string;
  entityName: string;
  officialIdentifiers: {
    ein?: string;
    ptin?: string;
    duns?: string;
    samUei?: string;
    laraId?: string;
    licenseNum?: string;
    fccFrn?: string;
    irsLetter?: string;
    charityStatus?: string;
  };
  highlight: string;
}

export interface ClientServiceElection {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedServiceId: string;
  serviceTitle: string;
  category: JeanellServiceCategory;
  urgency: 'routine' | 'priority' | 'urgent_immediate';
  notes: string;
  status: 'submitted' | 'under_review' | 'engagement_letter_issued' | 'in_progress' | 'completed';
  electedDate: string;
  engagementConfirmationNumber: string;
  feeStructure: string;
  entityResponsible: string;
  assignedAssociates: string[];
}
