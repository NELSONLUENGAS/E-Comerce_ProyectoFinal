import styled from 'styled-components';
import  {css} from 'styled-components';

export const Buttomm = styled.button`
display: block;
${props => props.HayStock === 'true' && css`
		display: none;
	`}
	${props => props.HayStock === 'false' && css`
		display: block;
	`}
`;