
// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const styles = theme => ({
  // containers
  root: {
    display: 'inline-flex',
    flexDirection: 'column'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
    width: '530px',
    flexWrap: 'wrap'
  },
  queryContainer: {
    display: 'flex',
    maxWidth: 500,
    flexWrap: 'wrap'
  },
  dateTimePicker: {
    display: 'flex'
  },
  datePicker: {
    display: 'flex'
  },
  timePicker: {
    display: 'flex'
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  // selects and inputs
  selectBase: {
    backgroundColor: theme.palette.fieldbg.main,
    color: theme.palette.text.main,
    border: 'none',
    borderBottom: `0px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
    margin: [0, 5, 10],
    fontSize: 16,
    padding: 5,
    cursor: 'default',
    select: `
-webkit-appearance: none;
-webkit-border-radius: 0px;
`,
    '&:hover': {
      // backgroundColor: theme.palette.info.bright[3]
      cursor: 'pointer'
    }
  },
  inputBase: {
    extend: 'selectBase'
  },
  selectField: {
    extend: 'selectBase'
  },
  selectOption: {
    extend: 'selectBase'
  },
  selectOp: {
    extend: 'selectBase'
  },
  // inputs
  inputQuery: {
    extend: 'selectBase',
    position: 'relative'
  },
  inputDatalist: {
    extend: 'inputBase'
  },
  // buttons
  buttonBase: {
    color: '#000',
    border: 'none'
  },
  fnButtons: {
    cursor: 'pointer',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    textTransform: 'uppercase',
    borderRadius: 3,
    padding: [12, 30],
    boxShadow: `
    0 2px 2px 0 rgba(109, 109, 109, 0.14), 0 3px 1px -2px rgba(109, 109, 109, 0.2), 0 1px 5px 0 rgba(109, 109, 109, 0.12)
    `,
    transition: `box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
   
    

    '&:hover': {
        boxShadow: `
        0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)
        `,
      color: 'white'
    },

  },
  addButton: {
    extend: ['buttonBase', 'fnButtons']
  },
  submitButton: {
    extend: ['buttonBase', 'fnButtons'],
    marginLeft: '10px'
  },
  removeButton: {
    extend: 'buttonBase',
    marginBottom: '20px',
    opacity: '.5',
    '&:hover': {
      cursor: 'pointer',
      opacity: '1',
    }
  },
  // spans
  andSpan: {
    margin: 10,
    extend: 'flex',
    alignItems: 'center'
  }
})

export default styles
