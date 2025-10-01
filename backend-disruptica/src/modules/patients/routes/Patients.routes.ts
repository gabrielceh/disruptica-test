import { Router } from "express";
import { DbPatientsDatasource  } from "@modules/patients/infrastructure/datasources";
import { PatientRepositoryImpl } from "@modules/patients/infrastructure/repositories";
import { PatientController } from "@modules/patients/controllers/Patient.controller";
import {validateCreatePatient, validateFindByName, validateUpdatePatient, validateAddConsultation, validatePatientId } from "@modules/patients/infrastructure/middlewares";
import { requireAdmin, validateToken } from "@src/core/shared/middlewares";

const router = Router();

const patientDatasource = new DbPatientsDatasource();
const patientRepository = new PatientRepositoryImpl(patientDatasource);
const patientController = new PatientController(patientRepository);

router.get('/',
  validateToken, 
  patientController.getActive
);

router.get('/patient/:id',
  validateToken, 
  patientController.getPatientById
);

router.get('/search/:name', 
  validateToken,
  validateFindByName,
  patientController.findByName
);

router.post('/create', 
  validateToken,
  requireAdmin,
  validateCreatePatient, 
  patientController.create
);

router.put('/update/:id', 
  validateToken,
  validateUpdatePatient,
  patientController.update
);

router.post('/consultation/:id', 
  validateToken,
  validateAddConsultation,
  patientController.addConsultation
);

router.patch('/activate/:id', 
  validateToken,
  requireAdmin,
  validatePatientId, 
  patientController.activate
);

router.delete('/:id', 
  validateToken,
  requireAdmin,
  validatePatientId, 
  patientController.deactivate
);

export default router;