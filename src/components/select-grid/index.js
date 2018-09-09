import React from 'react';
import {Header, Grid, Image} from 'semantic-ui-react';
import {Container, Col, Row} from 'reactstrap';
import Gallery from 'react-grid-gallery'
import _ from 'lodash';

class SelectGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assets: this.props.images
        };
    };

    onSelectImage = (index, image) => {
        let assets = this.state.assets.slice();
        let img = assets[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            assets: assets
        });
    };

    assetSelected = () => {
        return _.filter(this.state.assets, function(o) { return o.isSelected; }).length > 0;
    };

    selectAssets = () => {
        this.props.selectedAssets(this.state.assets);
    };

    selectAsset = (asset) => {
        this.props.selectAsset(asset);
    };

    render() {

        return (
            <Container>
                <Row>
                    <Col sm="12">
                        {/*<Gallery
                            images={this.state.assets}
                            onSelectImage={this.onSelectImage}
                            enableLightbox={false}
                        />*/}

                        <Grid.Row columns={2}>
                            {
                                this.state.assets.map((asset, key) => {
                                    return (
                                        <Grid.Column key={key}
                                                     style={{margin: '2px', cursor: 'pointer'}}
                                                     onClick={() => this.selectAsset(asset)}>
                                            <Header as='h4' textAlign={'center'} style={{marginTop: '10px'}}>
                                                <Header.Content>
                                                    {asset.name}
                                                </Header.Content>
                                            </Header>
                                            <Image src={asset.src} size='medium' style={{height: '200px'}} />
                                        </Grid.Column>
                                    )
                                })
                            }
                        </Grid.Row>

                    </Col>
                    {/*<Col sm="6" md={{size: 8, offset: 2}}>
                        {
                            this.assetSelected() ? (
                                <Button primary onClick={this.selectAssets}>Add Assets</Button>
                            ) : (null)
                        }
                    </Col>*/}
                </Row>
            </Container>
        );
    }
}

export default SelectGrid;