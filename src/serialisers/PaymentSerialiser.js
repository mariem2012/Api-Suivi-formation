export const PaymentSerialiser = {
  serializerForTable(entities) {
    return entities.map((entity) => {
      return {
        id: entity.id,
        payment_date: entity.payment_date,
        paid_amount: entity.amount,
        payer: entity.payer,
        payer_number: entity.payer_number,
        payment_mode: entity.payment_mode,
        registrationId: entity.registrationId,
        registration_date: entity.registration.registration_date,
        start_date: entity.registration.start_date,
        end_date: entity.registration.end_date,
        total_amount: entity.registration.amount,
        studentId: entity.registration.studentId,
        student_name: entity.registration.student.full_name,
        // student_number: entity.registration.student.phone_number,
        moduleId: entity.registration.moduleId,
        module_name: entity.registration.module.name,
        // duration: entity.registration.module.duration,
        // price: entity.registration.module.price,
      };
    });
  },

  serializerForPayment(entity) {
    return {
        id: entity.id,
        payment_date: entity.payment_date,
        paid_amount: entity.amount,
        payer: entity.payer,
        payer_number: entity.payer_number,
        payment_mode: entity.payment_mode,
        registrationId: entity.registrationId,
        registration_date: entity.registration.registration_date,
        start_date: entity.registration.start_date,
        end_date: entity.registration.end_date,
        total_amount: entity.registration.amount,
        studentId: entity.registration.studentId,
        student_name: entity.registration.student.full_name,
        moduleId: entity.registration.moduleId,
        module_name: entity.registration.module.name,
    }}
};
