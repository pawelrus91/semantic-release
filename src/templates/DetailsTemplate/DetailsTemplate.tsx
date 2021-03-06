import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import { usePageTypeContext } from '~/hooks';
import UserPageTemplate from '~/templates/UserPageTemplate/UserPageTemplate';

import type { Item, Modify } from '~/commonTypes';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const StyledImage = styled.img`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

export type DetailsTemplateProps = Modify<
  Omit<Item, 'id'>,
  {
    created: Date | null;
  }
>;

const DetailsTemplate = ({
  title,
  created,
  content,
  articleUrl,
  twitterName,
}: DetailsTemplateProps) => {
  const pageContext = usePageTypeContext();

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledPageHeader>
          <StyledHeading big as="h1">
            {title}
          </StyledHeading>
          <StyledParagraph>{created?.toString()}</StyledParagraph>
        </StyledPageHeader>
        <Paragraph>{content}</Paragraph>
        {pageContext === 'articles' && (
          <StyledLink data-testid="article-link" href={articleUrl as string}>
            Open article
          </StyledLink>
        )}
        {pageContext === 'twitters' && (
          <StyledImage
            data-testid="avatar"
            alt={title}
            src={`https://unavatar.now.sh/twitter/${twitterName as string}  `}
          />
        )}
        <Button as={Link} to={`/${pageContext}`} activecolor={pageContext}>
          save / close
        </Button>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

DetailsTemplate.defaultProps = {
  title: '',
  created: null,
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default DetailsTemplate;
