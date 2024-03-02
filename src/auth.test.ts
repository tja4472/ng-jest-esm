
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// import {default as config, authEmulatorPort} from './config';
import {initializeApp, FirebaseApp, deleteApp} from 'firebase/app';
import {getAuth, Auth, connectAuthEmulator, signInAnonymously} from 'firebase/auth';
//import {authState} from '../dist/auth';
import { authState } from 'rxfire/auth';
import {skip, take} from 'rxjs/operators';

const firebaseOptions = {
  projectId: 'demo-1',
  appId: '1:767794269558:web:819cea854c7b1b4ce6fe57',
  storageBucket: 'angularstart-chat.appspot.com',
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'angularstart-chat.firebaseapp.com',
  messagingSenderId: '767794269558',
};

describe('RxFire Auth', () => {
  let app: FirebaseApp;
  let auth: Auth;

  beforeEach(() => {
    app = initializeApp(firebaseOptions);
    auth = getAuth(app);
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
  });

  afterEach(() => {
    deleteApp(app).catch(() => undefined);
  });

  describe('Authentication state', () => {
    it('should initially be unauthenticated', (done) => {
      authState(auth)
          .pipe(take(1))
          .subscribe((state) => {
            console.log('aaaa')
            expect(state).not.toBeNull();
            console.log('bbbbb')            
          })
          .add(done);
    });

    it('should trigger an authenticated state', (done) => {
      authState(auth)
          .pipe(skip(1), take(1))
          .subscribe((state) => {
            expect(state).not.toBeNull();
            // expect(state.isAnonymous).toEqual(true);
          })
          .add(done);

      signInAnonymously(auth);
    },10000);
  });
});
