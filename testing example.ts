import { Test } from '@nestjs/testing'
import { FirebaseAdminModule } from '../../firebase-admin/firebase-admin.module'
import { NotificationController } from './notification.controller'
import { NotificationProvider } from './notification.provider'
import admin from 'firebase-admin';
//import { firestore } from 'firebase-admin'

// import _firestore, { Timestamp } from '@google-cloud/firestore'

//import DocumentReference = firestore.DocumentReference

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
const test = admin.initializeApp({projectId: "simplynft-store"});
const db = test.firestore()//getFirestore();


describe('NotificationController', () => {
  let notificationController: NotificationController
  let notificationProvider: NotificationProvider

  beforeEach(async () => {
    

    const moduleRef = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotificationProvider],
      imports: [FirebaseAdminModule],
    }).compile()

    notificationProvider = moduleRef.get<NotificationProvider>(NotificationProvider)
    notificationController = moduleRef.get<NotificationController>(NotificationController)
  })
  const requestMock= {
    id :["yash"]
  }as unknown as any

  // jest.mock('@google-cloud/firestore', () =>({
  //  // firestore:jest.fn(),
  //   update : jest.fn(),
  //   doc : jest.fn(() => {}),
  //   //collection :jest.spyOn(admin.firestore(), 'collection').mockReturnValue((({ doc } as unknown) as any))
  //   collection: jest.fn((data)=>{data})
  // }))


  //  jest.mock('@google-cloud/firestore',() =>{
  //    const update =jest.fn()
    
  //    return{
  //      collection:jest.fn(()=>({
  //        doc:jest.fn(()=>({
  //          update,
  //        }))
  //      }))
  //    }
  //  })
   


  // jest.mock('@google-cloud/firestore',()=>({
  //   collection: jest.fn(()=> {}),
  //   // doc:jest.fn((value)=>({
  //   //   value: 'yash'
  //   // })),
  //   doc: jest.fn((value) => {}),
  //   updateNotificationReadStatus:jest.fn(() =>({
  //     // update:jest.fn((surname)=>({
  //     //   surname: "patidar"
  //     // }))
  //     update:jest.fn(() => {})
  //   }))
    
 // }))
const update = jest.fn();
const doc = jest.fn(() => ({update}));
const collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue((({ doc } as unknown) as any));
  //  jest.mock('firebase-admin', ()=>{
  //   update:jest.fn()  
  //   doc:jest.fn((value)=>(value))
  //   collection: jest.fn((value)=> value)
  //   //
    
  // })

  describe('read information', () => {
    it('should update read status', async () => {
      /** */
      // const updateNotificationReadStatus: DocumentReference = db
      //   .collection('Users')
      //   .doc("yash") //readNotification.id

      // await updateNotificationReadStatus.update({
      //   surname: "patidar",
      // })
      const result = await notificationProvider.updateReadStatus(requestMock)
      
      // const result = await db.collection('Users').doc("yash").get()
      // console.log(result.data()['surname']);
      expect(collection).toHaveBeenCalledWith('Notification');
      expect(doc).toHaveBeenCalledWith(requestMock.id);
      expect(update).toHaveBeenCalledWith({readStatus:true});
      expect(result.success).toBe(true)

      //
      expect(result.success).not.toBe(false)
    })
  })
})
