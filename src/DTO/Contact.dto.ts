class ContactDTO {
  static toTransactionContact(contact_details: any) {
    return {
      contact_id: contact_details.id,
      contact_nane: contact_details.contactName,
    };
  }
}

export { ContactDTO };
