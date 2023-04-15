// Here is an example implementation of two-way binding using MobX:

import { observable } from 'mobx';

class User {
  @observable name = '';
}

const user = new User();

// Bind input value to user name
<input value={user.name} onChange={e => user.name = e.target.value} />

// Bind user name to a span
<span>{user.name}</span> 

// Changes to the input will update the user name, and changes to the user name will update the span. This is two-way binding.