export const defaultProps = {
  display: 'inline-block',
  margin: 0,
  width: 'auto',
  height: 'auto',
  // most of the buttons and link "buttons" in the design file are this width, so it's a sensible default; set to 'none' on the instances that don't need it, like the Sign Up link in the nav
  minW: '8.5rem',
  padding: '.75rem 1rem',
  backgroundColor: 'ocean',
  color: 'white',
  textAlign: 'center',
  fontWeight: 500,
  lineHeight: 'inherit',
  borderRadius: '11px',
  borderWidth: '0px',
  borderColor: 'currentColor',
  transition: 'all 250ms ease-in-out',
  _hover: { transform: 'translateY(3px)' },
  _active: { transform: 'translateY(6px)' }
}
