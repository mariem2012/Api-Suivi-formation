export const RegistrationSerialiser = {
  serializerForTable(entities) {
    return entities.map((entity) => {
      return {
        id: entity.id,
        registration_date: entity.registration_date,
        start_date: entity.start_date,
        end_date: entity.end_date,
        amount: entity.amount,
        paid : entity.paid,
        studentId: entity.studentId,
        student_name: entity.student.full_name,
        student_number: entity.student.phone_number,
        moduleId: entity.moduleId,
        module_name: entity.module.name,
      };
    });
  },

  serializerForRegistre(entity) {
    return {
      id: entity.id,
      registration_date: entity.registration_date,
      start_date: entity.start_date,
      end_date: entity.end_date,
      amount: entity.amount,
      paid : entity.paid,
      studentId: entity.studentId,
      student_name: entity.student.full_name,
      student_number: entity.student.phone_number,
      moduleId: entity.moduleId,
      module_name: entity.module.name,
    }}
};
