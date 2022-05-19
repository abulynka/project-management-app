### How to use
1. Inject into constructor:
```typescript
  public constructor(private dialog: MatDialog) {}
```
2. Call confirmation modal:
```typescript
  this.dialog
    .open(ConfirmationModalComponent, {
      minWidth: '320px',
      data: {
        title: 'title',
        message: 'message',
      },
    })
    .afterClosed()
    .subscribe((result: boolean) => {
      console.log(result);
    });
```
