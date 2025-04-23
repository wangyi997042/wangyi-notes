// src/access.ts
export default function(initialState: any) {
  const { userId, role } = initialState;
  console.log('initialState', initialState);
  
  return {
    canReadFoo: true,
    canUpdateFoo: role === 'admin',
    canDeleteFoo: (foo:any) => {
      return foo.ownerId === userId;
    },
  };
}