export const PaymentSerialiser = {
  serializerForTable(entities) {
    return entities.map((entity) => {
      return {
        id: entity.id,
        payment_date: entity.payment_date,
        amount: entity.amount,
        payer: entity.payer,
        payer_number: entity.payer_number,
        payment_mode: entity.payment_mode,
        registrationId: entity.registrationId,
        registration_date: entity.registration.registration_date,
        paid_amount: entity.registration.paid,
        studentId: entity.registration.studentId,
        student_name: entity.registration.student.full_name,
        moduleId: entity.registration.moduleId,
        module_name: entity.registration.module.name,
      };
    });
  },

  serializerForPayment(entity) {
    return {
      id: entity.id,
      payment_date: entity.payment_date,
      amount: entity.amount,
      payer: entity.payer,
      payer_number: entity.payer_number,
      payment_mode: entity.payment_mode,
      registrationId: entity.registrationId,
      registration_date: entity.registration.registration_date,
      paid_amount: entity.registration.paid,
      studentId: entity.registration.studentId,
      student_name: entity.registration.student.full_name,
      moduleId: entity.registration.moduleId,
      module_name: entity.registration.module.name,
    }}
};
