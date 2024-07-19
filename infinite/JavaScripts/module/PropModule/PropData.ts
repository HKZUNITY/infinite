export class PropData extends Subdata {
    @Decorator.persistence()
    public props: number[] = [];

    protected initDefaultData(): void {
        this.props = [];
    }

    public addProp(propId: number) {
        if (this.props.includes(propId)) return;
        this.props.push(propId);
        this.save(true);
    }
}