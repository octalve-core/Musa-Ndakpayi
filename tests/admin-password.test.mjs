import test from 'node:test';
import assert from 'node:assert/strict';
import {hashPassword,verifyPassword} from '../lib/admin-password.mjs';
test('administrator password is salted, expensive and verified without plaintext storage',()=>{
 const password='SampleStrongTemporaryPass_2026!';
 const a=hashPassword(password),b=hashPassword(password);
 assert.notEqual(a,b);
 assert.ok(a.startsWith('scrypt-v1:'));
 assert.ok(!a.includes(password));
 assert.equal(verifyPassword(password,a),true);
 assert.equal(verifyPassword('not the password',a),false);
 assert.equal(verifyPassword(password,'malformed'),false);
 assert.throws(()=>hashPassword('weak'));
});
