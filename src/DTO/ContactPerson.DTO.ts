class ContactPersonDTO {
  static toContactPersonCreateDTO(contact_person: any) {
    return {
      salutation: contact_person.salutation,
      firstName: contact_person.first_name,
      lastName: contact_person.last_name,
      email: contact_person.email,
      phone: contact_person.phone,
      mobile: contact_person.mobile,
      designation: contact_person.designation,
      isPrimary: contact_person.is_primary,
    };
  }

  static toContactPerson(contact_person: any) {
    return {
      contact_person_id: contact_person.contact_person_id,
      salutation: contact_person.salutation,
      first_name: contact_person.firstName,
      last_name: contact_person.lastName,
      email: contact_person.email,
      phone: contact_person.phone,
      mobile: contact_person.mobile,
      designation: contact_person.designation,
      is_primary: contact_person.isPrimary,
    };
  }
}

export { ContactPersonDTO };
