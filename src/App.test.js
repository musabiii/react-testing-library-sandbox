import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  it('render App',()=>{
    render(<App/>)
    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  })

 })
